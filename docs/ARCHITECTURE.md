# Architecture

VIVA currently uses dependency-free classic browser scripts so it can run on static hosting and can be bundled into a single standalone HTML file.

## Layers

- **Content**: phrases, lessons, builds, missions, stories.
- **Learning engine**: answer analysis, mastery changes, spaced review scheduling, coaching signals.
- **State**: local persistence, streaks, history, export/import.
- **UI services**: speech synthesis, speech recognition, recording, DOM helpers.
- **Features**: Home, Journey, Coach, Labs, Vault, Passport, Story.
- **App shell**: routing, navigation, settings, PWA registration.

The most important rule: game screens do not invent mastery math. They call the learning engine.
