'use strict';

const DEFAULTS = Object.freeze({
  groq: { model: 'llama-3.3-70b-versatile', baseUrl: 'https://api.groq.com/openai/v1' },
  gemini: { model: 'gemini-3.5-flash', baseUrl: 'https://generativelanguage.googleapis.com/v1beta' },
  openrouter: { model: 'openrouter/free', baseUrl: 'https://openrouter.ai/api/v1' },
  huggingface: { model: 'google/gemma-2-2b-it:fastest', baseUrl: 'https://router.huggingface.co/v1' },
  whisper: { model: 'whisper-large-v3-turbo', baseUrl: 'https://api.groq.com/openai/v1' }
});

function config(env = process.env) {
  return {
    groq: { name: 'groq', key: env.GROQ_API_KEY || '', model: env.GROQ_MODEL || DEFAULTS.groq.model, baseUrl: DEFAULTS.groq.baseUrl },
    gemini: { name: 'gemini', key: env.GEMINI_API_KEY || '', model: env.GEMINI_MODEL || DEFAULTS.gemini.model, baseUrl: DEFAULTS.gemini.baseUrl },
    openrouter: { name: 'openrouter', key: env.OPENROUTER_API_KEY || '', model: env.OPENROUTER_MODEL || DEFAULTS.openrouter.model, baseUrl: DEFAULTS.openrouter.baseUrl },
    huggingface: { name: 'huggingface', key: env.HF_TOKEN || '', model: env.HF_MODEL || DEFAULTS.huggingface.model, baseUrl: DEFAULTS.huggingface.baseUrl },
    whisper: { name: 'groq-whisper', key: env.GROQ_API_KEY || '', model: env.GROQ_WHISPER_MODEL || DEFAULTS.whisper.model, baseUrl: DEFAULTS.whisper.baseUrl }
  };
}

function providerOrder(env = process.env) {
  const known = ['groq', 'gemini', 'openrouter', 'huggingface'];
  const custom = String(env.VIVA_AI_PROVIDER_ORDER || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
  const unique = [...new Set(custom.filter(x => known.includes(x)))];
  return unique.length ? [...unique, ...known.filter(x => !unique.includes(x))] : known;
}

function extractText(data) {
  if (!data) return '';
  if (typeof data === 'string') return data;
  const openAI = data.choices?.[0]?.message?.content;
  if (typeof openAI === 'string') return openAI;
  if (Array.isArray(openAI)) return openAI.map(p => p?.text || p?.content || '').join('');
  const gemini = data.candidates?.[0]?.content?.parts?.map(p => p?.text || '').join('');
  return gemini || data.output_text || data.text || '';
}

async function openAIChat(provider, messages, { fetchImpl = fetch, maxTokens = 260, responseFormat } = {}) {
  const headers = { 'content-type': 'application/json', authorization: `Bearer ${provider.key}` };
  if (provider.name === 'openrouter') {
    headers['HTTP-Referer'] = 'https://github.com/q-p1/Viva-Spanish';
    headers['X-OpenRouter-Title'] = 'VIVA Spanish';
  }
  const body = { model: provider.model, messages, max_tokens: maxTokens };
  if (responseFormat) body.response_format = responseFormat;
  const res = await fetchImpl(`${provider.baseUrl}/chat/completions`, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok) throw providerError(provider.name, res.status, await safeText(res));
  const data = await res.json();
  const text = extractText(data).trim();
  if (!text) throw providerError(provider.name, 502, 'empty response');
  return { text, provider: provider.name, model: data.model || provider.model };
}

async function geminiGenerate(provider, { prompt, image, mimeType = 'image/jpeg' }, { fetchImpl = fetch, maxOutputTokens = 320 } = {}) {
  const parts = [{ text: prompt }];
  if (image) parts.push({ inline_data: { mime_type: mimeType, data: stripDataUrl(image) } });
  const res = await fetchImpl(`${provider.baseUrl}/models/${encodeURIComponent(provider.model)}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': provider.key },
    body: JSON.stringify({ contents: [{ role: 'user', parts }], generationConfig: { maxOutputTokens } })
  });
  if (!res.ok) throw providerError(provider.name, res.status, await safeText(res));
  const data = await res.json();
  const text = extractText(data).trim();
  if (!text) throw providerError(provider.name, 502, 'empty response');
  return { text, provider: provider.name, model: provider.model };
}

async function groqTranscribe(provider, audioDataUrl, { fetchImpl = fetch, language = 'es' } = {}) {
  if (!audioDataUrl) throw new Error('audio-required');
  const match = /^data:([^;,]+);base64,(.+)$/s.exec(audioDataUrl);
  if (!match) throw new Error('audio-must-be-data-url');
  const [, mimeType, b64] = match;
  const bytes = Buffer.from(b64, 'base64');
  const ext = extensionForMime(mimeType);
  const form = new FormData();
  form.append('file', new Blob([bytes], { type: mimeType }), `viva-recording.${ext}`);
  form.append('model', provider.model);
  form.append('language', language);
  form.append('response_format', 'json');
  const res = await fetchImpl(`${provider.baseUrl}/audio/transcriptions`, {
    method: 'POST', headers: { authorization: `Bearer ${provider.key}` }, body: form
  });
  if (!res.ok) throw providerError(provider.name, res.status, await safeText(res));
  const data = await res.json();
  return { text: String(data.text || '').trim(), provider: 'groq', model: provider.model };
}

function providerError(provider, status, detail) {
  const err = new Error(`${provider}-provider-failed`);
  err.provider = provider; err.status = status; err.detail = String(detail || '').slice(0, 300);
  return err;
}
function stripDataUrl(value) { return String(value || '').replace(/^data:[^;,]+;base64,/, ''); }
function extensionForMime(mime) { return ({ 'audio/webm':'webm','audio/wav':'wav','audio/x-wav':'wav','audio/mpeg':'mp3','audio/mp4':'m4a','audio/ogg':'ogg' })[mime] || 'webm'; }
async function safeText(res) { try { return await res.text(); } catch { return ''; } }

module.exports = { DEFAULTS, config, providerOrder, extractText, openAIChat, geminiGenerate, groqTranscribe };
