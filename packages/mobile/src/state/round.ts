import { assign, setup } from 'xstate';

export type Team = { name: string; totalScore: number };

export type RoundContext = {
  teams: Team[];
  words: string[];
  /** Counts up once every team has had its turn. */
  round: number;
  /** Total turns played; the playing team is derived from it. */
  turn: number;
};

export type RoundEvent =
  | { type: 'UPDATE_WORDS'; value: string[] }
  | { type: 'SET_TEAMS'; value: Team[] }
  | { type: 'ADD_POINTS'; teamIndex: number; points: number }
  | { type: 'NEXT_TURN' };

/** Index of the team playing now. Safe before any team is set. */
export function currentTeamIndex({ teams, turn }: RoundContext): number {
  return teams.length === 0 ? 0 : turn % teams.length;
}

/** Index of the team that plays after the current one. */
export function nextTeamIndex({ teams, turn }: RoundContext): number {
  return teams.length === 0 ? 0 : (turn + 1) % teams.length;
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
    round: 1,
    turn: 0,
  },
  states: {
    round: {
      on: {
        UPDATE_WORDS: {
          actions: assign({ words: ({ event }) => event.value }),
        },
        SET_TEAMS: {
          actions: assign({ teams: ({ event }) => event.value }),
        },
        ADD_POINTS: {
          actions: assign({
            teams: ({ context, event }) =>
              context.teams.map((team, index) =>
                index === event.teamIndex
                  ? { ...team, totalScore: team.totalScore + event.points }
                  : team,
              ),
          }),
        },
        NEXT_TURN: {
          actions: assign(({ context }) => {
            const turn = context.turn + 1;
            const everyonePlayed =
              context.teams.length > 0 && turn % context.teams.length === 0;

            return {
              turn,
              round: everyonePlayed ? context.round + 1 : context.round,
            };
          }),
        },
      },
    },
  },
});
