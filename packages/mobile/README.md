# Crocodalias — мобильное приложение

Expo SDK 57, React Native 0.86, expo-router. Экраны лежат в `src/app`,
логика игры — в `src/state` (машины состояний XState).

## Запуск

- `npx expo run:ios` — собрать нативную часть и открыть на симуляторе.
  Нужно в первый раз и после изменения нативных зависимостей.
- `npx expo start --dev-client` — только JavaScript, с горячей перезагрузкой.
- `npm run lint` — ESLint.

## Словари

Колоды в `src/dictionaries/ru` генерируются командой `npm run build:dictionaries`
из корня репозитория и руками не правятся. Подробности — в `DICTIONARIES.md`.
