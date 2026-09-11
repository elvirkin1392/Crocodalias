# Crocodalias

Party word games for your phone — **Crocodile** (charades), **Alias** and
**The Hat** — built with React Native and Expo.

> **Status: work in progress.** The round flow — round info, play and results,
> with scores carried from turn to turn — runs on iOS. The swipeable word cards,
> the game settings screens and the game picker are still being ported from the
> original web prototype.

## Features

- Classic team party games, played on a single phone passed around the table
- Four difficulty levels: easy, medium, advanced and pro
- Works fully offline — the word decks ship inside the app
- Game logic modelled as XState state machines, independent of the UI

## Repository layout

```
packages/
  mobile/   React Native app (Expo SDK 57) — the product
  web/      Original React + Vite prototype, frozen for reference
```

## Tech stack

The mobile app uses:

- Expo SDK 57, React Native 0.86, React 19.2
- expo-router for navigation
- XState 5 and @xstate/react 6 for game state
- React Native Reanimated and Gesture Handler for gestures and animations
- TypeScript, ESLint (`eslint-config-expo`) and Prettier

## Getting started

### Requirements

- Node.js 20.19.4 or newer (24 LTS recommended)
- macOS with Xcode 26.4 or newer and an iOS Simulator runtime
- CocoaPods
- A UTF-8 locale in your shell — CocoaPods fails without it:
  `export LANG=en_US.UTF-8`

### Run on iOS

```bash
cd packages/mobile
npm install
npx expo run:ios
```

The first native build takes a while. After that, JavaScript-only changes need
no rebuild — just start the dev server with hot reload:

```bash
npx expo start --dev-client
```

### Scripts

Run from `packages/mobile`:

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run ios`     | Build the native project and run it on iOS          |
| `npm run android` | The same for Android (not tested yet)               |
| `npm start`       | Start the Metro dev server                          |
| `npm run lint`    | Check the code with ESLint, including Prettier      |
| `npm run format`  | Format the code with Prettier                       |

## Word decks

The word lists live in `packages/mobile/src/dictionaries/ru/` — one JSON file
per difficulty level, one word per line in alphabetical order. Edit them
directly: add a word to the file for its level, or delete a line to drop it.
Order does not matter, the deck is shuffled before every round.

The lists were built once from open data and then curated by hand. Sources:

- [Badestrand/russian-dictionary](https://github.com/Badestrand/russian-dictionary)
  — nouns with their full paradigms, from [OpenRussian.org](https://en.openrussian.org)
- [hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords)
  — word frequencies from the OpenSubtitles 2018 corpus

## License

The word decks are derived from the sources above and are distributed under
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), as those
sources require.
