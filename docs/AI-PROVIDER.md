# VIVA Multi-Provider AI Gateway

VIVA never puts an AI secret in browser JavaScript. The frontend sends one normalized request to a backend gateway, and the gateway chooses a configured provider.

## Providers

| Provider | Default model | Used for |
| --- | --- | --- |
| Groq | `llama-3.3-70b-versatile` | NPC conversation, adventures |
| Groq Whisper | `whisper-large-v3-turbo` | Spanish speech transcription |
| Gemini | `gemini-3.5-flash` | NPCs, adventures, real-world image scanning |
| OpenRouter | `openrouter/free` | Free-model text fallback |
| Hugging Face | `google/gemma-2-2b-it:fastest` | Final text fallback |

Every model can be overridden with an environment variable so model churn does not require frontend changes.

## Failover

Default text order:

`Groq → Gemini → OpenRouter → Hugging Face → VIVA local fallback`

If a provider returns a rate-limit or API error, the gateway tries the next configured provider. Image scanning currently prioritizes Gemini because its multimodal endpoint is explicit and reliable. Speech transcription uses Groq Whisper and falls back to the browser speech recognizer if the gateway is unavailable.

## Setup

Copy `.env.example` to `.env` locally, then add only the keys you have. Do **not** commit `.env`.

```bash
cp .env.example .env
# export the variables or load them with your hosting platform
npm run ai:serve
```

The local gateway listens at `http://localhost:8787/api/ai` by default. Put that URL into VIVA Settings → VIVA AI Gateway. Use **Test gateway** to see which providers are configured. The status response contains provider names/models, never secret values.

## Request types

- `conversation` — open NPC reply
- `adventure` — generated level-aware micro-adventure
- `scan` — image/sign/menu understanding (Gemini)
- `transcription` — Spanish audio transcription (Groq Whisper)
- `status` — provider health/configuration metadata

## Production rules

- Store keys only as server-side environment secrets.
- Use HTTPS.
- Set `VIVA_ALLOWED_ORIGIN` to the real frontend origin instead of `*`.
- Add authentication and per-user/IP rate limits before opening a public production gateway.
- Validate request size and output schemas.
- Never expose provider errors containing secrets to the browser.

The gateway is intentionally dependency-light and uses Node 20's built-in `fetch`, `FormData`, and `Blob` APIs.
