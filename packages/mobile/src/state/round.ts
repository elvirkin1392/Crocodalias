import { assign, setup } from 'xstate';

export type Team = { name: string; totalScore: number };

export type WordResult = 'guessed' | 'skipped' | 'stolen';

export type TurnEntry = {
  word: string;
  result: WordResult;
  /** The team that received the points for this word. */
  teamIndex: number;
};

export type RoundContext = {
  teams: Team[];
  words: string[];
  /** Position in the shuffled deck; keeps going across turns. */
  wordIndex: number;
  /** Words resolved during the current turn, in order. */
  turnLog: TurnEntry[];
  /** Counts up once every team has had its turn. */
  round: number;
  /** Total turns played; the playing team is derived from it. */
  turn: number;
};

export type RoundEvent =
  | { type: 'UPDATE_WORDS'; value: string[] }
  | { type: 'SET_TEAMS'; value: Team[] }
  | { type: 'ADD_POINTS'; teamIndex: number; points: number }
  | { type: 'RESOLVE_WORD'; result: 'guessed' | 'skipped' }
  | { type: 'RESOLVE_WORD'; result: 'stolen'; teamIndex: number }
  | { type: 'NEXT_TURN' };

const POINTS: Record<WordResult, number> = {
  guessed: 1,
  skipped: -1,
  stolen: 1,
};

/** Index of the team playing now. Safe before any team is set. */
export function currentTeamIndex({ teams, turn }: RoundContext): number {
  return teams.length === 0 ? 0 : turn % teams.length;
}

/** Index of the team that plays after the current one. */
export function nextTeamIndex({ teams, turn }: RoundContext): number {
  return teams.length === 0 ? 0 : (turn + 1) % teams.length;
}

export function currentWord({ words, wordIndex }: RoundContext): string {
  const hasWords = words.length > 0;

  return hasWords ? words[wordIndex % words.length] : '';
}

export function turnPoints({ turnLog }: RoundContext): number {
  return turnLog
    .filter((entry) => entry.result !== 'stolen')
    .reduce((sum, entry) => sum + POINTS[entry.result], 0);
}

export function stolenPoints(
  { turnLog }: RoundContext,
  teamIndex: number,
): number {
  return turnLog.filter(
    (entry) => entry.result === 'stolen' && entry.teamIndex === teamIndex,
  ).length;
}

function addPoints(teams: Team[], teamIndex: number, points: number): Team[] {
  return teams.map((team, index) =>
    index === teamIndex
      ? { ...team, totalScore: team.totalScore + points }
      : team,
  );
}

export const roundMachine = setup({
  types: {
    context: {} as RoundContext,
    events: {} as RoundEvent,
  },
}).createMachine({
  id: 'round',
  initial: 'round',
  context: {
    teams: [],
    words: [],
    wordIndex: 0,
    turnLog: [],
    round: 1,
    turn: 0,
  },
  states: {
    round: {
      on: {
        UPDATE_WORDS: {
          actions: assign({ words: ({ event }) => event.value, wordIndex: 0 }),
        },
        SET_TEAMS: {
          actions: assign({ teams: ({ event }) => event.value }),
        },
        ADD_POINTS: {
          actions: assign({
            teams: ({ context, event }) =>
              addPoints(context.teams, event.teamIndex, event.points),
          }),
        },
        RESOLVE_WORD: {
          actions: assign(({ context, event }) => {
            const teamIndex =
              event.result === 'stolen'
                ? event.teamIndex
                : currentTeamIndex(context);
            const entry = {
              word: currentWord(context),
              result: event.result,
              teamIndex,
            };

            return {
              teams: addPoints(context.teams, teamIndex, POINTS[event.result]),
              turnLog: [...context.turnLog, entry],
              wordIndex: context.wordIndex + 1,
            };
          }),
        },
        NEXT_TURN: {
          actions: assign(({ context }) => {
            const turn = context.turn + 1;
            const everyonePlayed =
              context.teams.length > 0 && turn % context.teams.length === 0;

            return {
              turn,
              turnLog: [],
              round: everyonePlayed ? context.round + 1 : context.round,
            };
          }),
        },
      },
    },
  },
});
