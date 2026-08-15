'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
loadDotEnv(path.resolve(__dirname,'..','.env'));
const { handle, status } = require('./gateway');

const port = Number(process.env.VIVA_AI_PORT || 8787);
const allowedOrigin = process.env.VIVA_ALLOWED_ORIGIN || '*';
const maxBody = 18 * 1024 * 1024;

const server = http.createServer(async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return end(res, 204, '');
  if (req.method === 'GET' && req.url === '/api/ai/status') return json(res, 200, status(process.env));
  if (req.method !== 'POST' || req.url !== '/api/ai') return json(res, 404, { error:'not-found' });
  try {
    const body = await readJson(req);
    const result = await handle(body, { env: process.env, fetchImpl: fetch });
    json(res, result.status, result.body);
  } catch (err) {
    json(res, err.message === 'payload-too-large' ? 413 : 400, { error:err.message || 'bad-request' });
  }
});

server.listen(port, () => {
  console.log(`VIVA AI Gateway listening on http://localhost:${port}/api/ai`);
  console.log('Configured providers:', Object.entries(status(process.env).providers).filter(([,v])=>v.configured).map(([k])=>k).join(', ') || 'none');
});

function cors(res){res.setHeader('Access-Control-Allow-Origin',allowedOrigin);res.setHeader('Access-Control-Allow-Headers','content-type');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Vary','Origin');}
function json(res,status,body){res.statusCode=status;res.setHeader('content-type','application/json; charset=utf-8');res.end(JSON.stringify(body));}
function end(res,status,body){res.statusCode=status;res.end(body);}
function readJson(req){return new Promise((resolve,reject)=>{let bytes=0,chunks=[];req.on('data',c=>{bytes+=c.length;if(bytes>maxBody){reject(new Error('payload-too-large'));req.destroy();return}chunks.push(c)});req.on('end',()=>{try{resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}'))}catch{reject(new Error('invalid-json'))}});req.on('error',reject)});}


function loadDotEnv(file){
  try{
    const text=fs.readFileSync(file,'utf8');
    for(const raw of text.split(/\r?\n/)){
      const line=raw.trim();if(!line||line.startsWith('#'))continue;
      const i=line.indexOf('=');if(i<1)continue;
      const key=line.slice(0,i).trim(),value=line.slice(i+1).trim().replace(/^['"]|['"]$/g,'');
      if(!(key in process.env))process.env[key]=value;
    }
  }catch(e){}
}
