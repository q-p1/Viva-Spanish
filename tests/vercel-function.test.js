'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const handler = require('../api/ai');

function mockRes(){
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    setHeader(k,v){ this.headers[k.toLowerCase()] = v; },
    status(code){ this.statusCode = code; return this; },
    json(body){ this.body = body; return this; },
    end(){ return this; }
  };
}

test('Vercel AI route exposes safe gateway status', async () => {
  const req = { method:'GET', headers:{ origin:'https://viva.example' } };
  const res = mockRes();
  await handler(req,res);
  assert.equal(res.statusCode,200);
  assert.equal(res.body.ok,true);
  assert.equal(res.body.gateway,'viva-ai-gateway-v1');
  assert.equal(res.headers['access-control-allow-origin'],'https://viva.example');
});

test('Vercel AI route accepts POST status payload', async () => {
  const req = { method:'POST', headers:{}, body:{ type:'status' } };
  const res = mockRes();
  await handler(req,res);
  assert.equal(res.statusCode,200);
  assert.equal(res.body.ok,true);
  assert.ok(res.body.providers.groq);
});
