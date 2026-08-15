'use strict';

const { handle, status } = require('../server/gateway');

module.exports = async function vivaAiHandler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method === 'GET') return res.status(200).json(status(process.env));
  if (req.method !== 'POST') return res.status(405).json({ error: 'method-not-allowed' });

  try {
    const payload = parseBody(req.body);
    const result = await handle(payload, { env: process.env, fetchImpl: fetch });
    return res.status(result.status).json(result.body);
  } catch (err) {
    return res.status(400).json({ error: err?.message || 'bad-request' });
  }
};

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'object' && !Buffer.isBuffer(body)) return body;
  const text = Buffer.isBuffer(body) ? body.toString('utf8') : String(body);
  return JSON.parse(text || '{}');
}

function setCors(req, res) {
  const configured = process.env.VIVA_ALLOWED_ORIGIN || '*';
  const requestOrigin = req.headers?.origin || '*';
  const origin = configured === '*' ? requestOrigin : configured;
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Vary', 'Origin');
}
