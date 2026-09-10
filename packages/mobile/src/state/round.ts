import { assign, setup } from 'xstate';

export type Team = { name: string; totalScore: number };

export type RoundContext = {
  teams: Team[];
  words: string[];
  round: number;
  turn: number;
};

export type RoundEvent =
  | { type: 'UPDATE_WORDS'; value: string[] }
  | { type: 'SET_TEAMS'; value: Team[] }
  | { type: 'NEXT_ROUND' };

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
        NEXT_ROUND: {
          actions: assign({ round: ({ context }) => context.round + 1 }),
        },
      },
    },
  },
});
