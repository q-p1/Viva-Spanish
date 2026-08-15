'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { handle, status, parseJsonObject } = require('../server/gateway');

function response(statusCode, body){return {ok:statusCode>=200&&statusCode<300,status:statusCode,async json(){return body},async text(){return JSON.stringify(body)}}}

test('status exposes configuration but never keys',()=>{
  const s=status({GROQ_API_KEY:'secret',GEMINI_API_KEY:'gem',OPENROUTER_API_KEY:'or',HF_TOKEN:'hf'});
  assert.equal(s.providers.groq.configured,true);
  assert.equal(JSON.stringify(s).includes('secret'),false);
  assert.deepEqual(s.order,['groq','gemini','openrouter','huggingface']);
});

test('conversation falls through from Groq to Gemini',async()=>{
  const calls=[];
  const env={GROQ_API_KEY:'x',GEMINI_API_KEY:'y',VIVA_AI_PROVIDER_ORDER:'groq,gemini'};
  const fetchImpl=async(url)=>{calls.push(url);if(url.includes('groq.com'))return response(429,{error:'rate'});return response(200,{candidates:[{content:{parts:[{text:'Hola, ¿qué tal?'}]}}]})};
  const r=await handle({type:'conversation',npc:'Lucia',userText:'Hola',level:20},{env,fetchImpl});
  assert.equal(r.status,200);assert.equal(r.body.provider,'gemini');assert.equal(r.body.reply,'Hola, ¿qué tal?');assert.equal(calls.length,2);
});

test('OpenRouter free router works as text fallback',async()=>{
  const env={OPENROUTER_API_KEY:'x',VIVA_AI_PROVIDER_ORDER:'openrouter'};
  const fetchImpl=async(url,opts)=>{const body=JSON.parse(opts.body);assert.equal(body.model,'openrouter/free');return response(200,{model:'free-model',choices:[{message:{content:'Vale.'}}]})};
  const r=await handle({type:'conversation',npc:'Mateo',userText:'Gracias'},{env,fetchImpl});
  assert.equal(r.status,200);assert.equal(r.body.provider,'openrouter');assert.equal(r.body.reply,'Vale.');
});

test('scan requires Gemini and parses strict JSON',async()=>{
  const env={GEMINI_API_KEY:'x'};
  const fetchImpl=async()=>response(200,{candidates:[{content:{parts:[{text:'{"summary":"menu","phrases":[{"es":"café","en":"coffee","why":"visible"}]}' }]}}]});
  const r=await handle({type:'scan',image:'data:image/jpeg;base64,YQ=='},{env,fetchImpl});
  assert.equal(r.status,200);assert.equal(r.body.provider,'gemini');assert.equal(r.body.phrases[0].es,'café');assert.equal(r.body.text,'café');
});

test('no configured providers returns 503 instead of leaking frontend secrets',async()=>{
  const r=await handle({type:'conversation',npc:'Mateo',userText:'Hola'},{env:{},fetchImpl:async()=>{throw new Error('should not call')}});
  assert.equal(r.status,503);assert.equal(r.body.error,'no-ai-provider-available');
});

test('JSON recovery handles fenced-ish provider output',()=>{
  assert.deepEqual(parseJsonObject('result: {"title":"x","goal":"y"} thanks'),{title:'x',goal:'y'});
});
