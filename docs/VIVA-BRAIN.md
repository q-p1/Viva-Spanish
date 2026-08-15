# VIVA Brain

VIVA Brain is the shared learner model behind the course, Madrid World, review, missions, captions, stories and labs.

It currently models:

- phrase mastery
- error type frequency
- recall speed
- review due time
- forgetting risk
- mode performance (listening, recall, pressure, pronunciation, etc.)
- NPC memory and relationship state
- real-life skill readiness

## Forgetting risk

`src/learning/brain.js` combines low mastery, repeated errors, overdue review time and slow recall into a 0–100 risk score. This is intentionally interpretable rather than pretending a tiny local prototype has a magical neuroscience oracle.

## AI provider architecture

The game is fully usable without a remote model. `src/core/ai-adapter.js` provides local NPC fallbacks. A secure backend endpoint can be configured in Settings for richer open-ended conversation, image scanning and generated adventures.

API keys must never be embedded in the browser build.
