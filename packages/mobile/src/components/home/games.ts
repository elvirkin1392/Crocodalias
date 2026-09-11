export type GameId = 'alias' | 'crocodile' | 'hat';

export type Game = { id: GameId; isAvailable: boolean };

export const GAMES: Game[] = [
  { id: 'alias', isAvailable: true },
  { id: 'crocodile', isAvailable: false },
  { id: 'hat', isAvailable: false },
];
