# VIVA

**Spanish that adapts to you, then gives you a world to use it in.**

VIVA is a mobile-first Spanish learning game built around one shared learner model. The course, Madrid World, NPCs, review queue, captions, stories, missions and labs all read from the same state instead of behaving like unrelated mini-apps.

## Signature systems

1. **VIVA Brain** — personal learner profile, recall speed, mode performance and recommendations.
2. **Adaptive AI NPC architecture** — local smart NPCs now, optional secure remote provider for richer open conversation.
3. **Pronunciation Engine** — regional speech recognition, model audio, Shadow Loop recording and replay.
4. **Madrid World** — 12 locations gated by real language readiness.
5. **NPC Memory** — characters remember facts, turns, last replies and relationship state.
6. **Dynamic Life Events** — level-aware problems appear in the city.
7. **Teach Me From My Life** — interests generate a personal phrase path.
8. **Real World Scanner** — photo/sign/menu → extracted or manually captured phrase → personal lesson.
9. **Immersion Feed** — short audio-first cards with optional caption reveal.
10. **Detective Mode** — Spanish clues become gameplay.
11. **Boss Conversations** — multi-turn exchanges with limited rescue help.
12. **Forgetting Prediction** — phrase-level risk scores.
13. **One Mistake, Five Ways** — listen, recognize, recall, build and mission repair paths.
14. **Why? Button** — chunk-level explanations exactly when needed.
15. **Grammar Discovery** — patterns before terminology.
16. **Accent Studio** — Spain, Mexico, Argentina and Colombia speech targets.
17. **Survival Test** — chained real-world situations.
18. **Ability Passport** — Ready / Almost ready / Developing by skill.
19. **Madrid Campaign** — 12 chapters from arrival to a no-English survival day.
20. **Daily Adventure** — changing city problem tied to learner readiness.

Existing systems remain: Memory DNA, Smart Review, Caption Fade, Rescue Mode, Dictation, Sentence Forge, Pressure Mode, Match Sprint, Phrase Vault, favorites, notes, personal phrases, PWA caching and single-file standalone builds.

## Run locally

```bash
npm test
npm run build
npm run serve
```

Open `http://localhost:4173`.

`npm run build` creates `dist/viva-standalone.html` for single-file testing.

## Optional AI backend

VIVA works without a remote AI service. Open-ended NPCs use local fallbacks. A secure backend can be configured in Settings for richer conversation, scan/OCR and generated adventures. **Never put an API key in the browser.** See `docs/AI-PROVIDER.md`.

## Structure

- `src/learning/` VIVA Brain, mastery, scheduler, answer analysis and repair
- `src/data/` Spanish content and Madrid world data
- `src/features/` Journey, World, Coach, Labs, Vault, Passport and Campaign
- `src/core/` state, routing and optional AI provider adapter
- `src/ui/` audio, regional speech and microphone helpers
- `styles/` mobile-first design system
- `tests/` learning-system tests
- `docs/` product, learning, architecture, world and AI-provider docs
