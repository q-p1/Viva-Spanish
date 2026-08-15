# VIVA

**Spanish that adapts to you.**

VIVA is a mobile-first Spanish learning game built around a personal learning model instead of generic XP grinding. It begins from absolute zero, then gradually removes support as the learner proves recall.

## What makes VIVA different

- **Memory DNA** tracks mistake types: swaps, missing letters, extra letters, substitutions, word order, accent errors, and full memory gaps.
- **Forgetting Radar** ranks phrases by mastery, repeated errors, and review timing.
- **Recall Speed** distinguishes “I eventually remembered it” from automatic retrieval.
- **Caption Fade** removes English phrase-by-phrase as mastery rises.
- **Life Missions** measure real abilities: greet someone, order, recover when lost, ask for help, shop, and survive a no-caption chain.
- **Rescue Mode** makes getting unstuck part of the curriculum.
- **Shadow Loop** supports hear → repeat → record → replay where microphone access exists.
- **Pronunciation Lab** uses browser speech recognition where supported.
- **Sentence Forge** assembles useful sentences from learned pieces.
- **Conversation Ladder** only asks for language already introduced.
- **Story World** unlocks narrative chapters based on readiness.
- **Spanish Passport** shows capability stamps rather than meaningless levels.
- **Personal Mission Builder** lets the learner add phrases from real life.
- **Phrase Vault** adds search, categories, favorites, notes, audio, and personal phrases.
- **Offline PWA** caches the core game when served over HTTPS.
- **Standalone build** generates one HTML file for quick testing and mobile sharing.

## Run locally

```bash
npm test
npm run build
npm run serve
```

Open `http://localhost:4173`.

For a single-file build, open `dist/viva-standalone.html`.

## Project structure

- `src/learning/` adaptive learning logic
- `src/features/` game systems and screens
- `src/data/` course, mission, and story content
- `src/ui/` audio, microphone, and rendering helpers
- `styles/` design system and responsive UI
- `tests/` core learning-system tests
- `docs/` product and architecture decisions

## Current scope

This repository contains the complete offline-first beginner foundation and a scalable architecture for expanding into A1 → A2 → B1 content, richer stories, cloud sync, multiplayer challenges, and AI conversation when a secure backend is introduced.
