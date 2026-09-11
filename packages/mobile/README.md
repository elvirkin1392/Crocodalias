# Crocodalias — mobile app

The React Native app: Expo SDK 57, React Native 0.86, expo-router.
Requirements and the project overview live in the [root README](../../README.md).

## Structure

```
src/
  app/            Routes (expo-router) — one-line files that point to screens
  screens/        Screens, each in its own folder next to its styles
  components/     UI pieces shared between screens
  state/          Game logic as XState state machines
  context/        React contexts that hold the running machines
  dictionaries/   Deck loader; ru/ holds the word lists
```

## Development

- `npx expo run:ios` — build the native project and open it on the simulator.
  Needed the first time and whenever native dependencies change.
- `npx expo start --dev-client` — JavaScript only, with hot reload.
- `npm run lint` — ESLint, including the Prettier check.
- `npm run format` — format everything with Prettier.

## Word decks

The word lists live in `src/dictionaries/ru`, one JSON file per difficulty
level, one word per line in alphabetical order. Edit them directly: add a word
to the file for its level, or delete a line to drop it. Order does not matter —
the deck is shuffled before every round.
