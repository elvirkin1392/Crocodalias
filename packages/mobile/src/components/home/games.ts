import type { Href } from 'expo-router';

export type GameId = 'alias' | 'crocodile' | 'hat';

/** A game without a settings route is shown as coming soon. */
export type Game = { id: GameId; settingsRoute?: Href };

export const GAMES: Game[] = [
  { id: 'alias', settingsRoute: '/alias-settings' },
  { id: 'crocodile', settingsRoute: '/crocodile-settings' },
  { id: 'hat' },
];
