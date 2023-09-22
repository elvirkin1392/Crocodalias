import { createMachine, assign } from "xstate";

type Context = {
  teams: [];
  words: [];
  round: number;
};
type Events =
  | { type: "OPEN_ROUND_RESULTS" }
  | { type: "SET_TEAMS" }
  | { type: "NEXT_ROUND" };

export const roundMachine = createMachine<Context, Events>({
  initial: "round",
  context: {
    teams: [],
    words: [],
    round: 1,
    turn: 0,
  },
  on: {},
  states: {
    round: {
      on: {
        UPDATE_WORDS: {
          actions: assign({ words: (context, event) => event.value }),
        },
        SET_TEAMS: {
          actions: assign({ teams: (context, event) => event.value }),
        },
        NEXT_ROUND: {
          actions: assign({ round: (context) => context.round + 1 }),
        },
      },
    },
  },
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
});
