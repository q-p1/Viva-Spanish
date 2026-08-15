# Optional AI Provider

VIVA never puts an AI secret in client JavaScript.

Set an HTTPS backend endpoint in Settings. The frontend sends JSON requests with a `type` field:

- `conversation` — open NPC reply
- `scan` — image/text extraction
- `adventure` — generated daily event

Without a backend, VIVA uses deterministic local fallbacks so the game remains offline-capable.

A production provider should implement authentication, rate limits, moderation, request validation, privacy controls and strict output schemas.
