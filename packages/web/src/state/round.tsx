import { createMachine, assign } from "xstate";

type Context = { teams: []; time: number; score: number };
type Events = { type: "OPEN_ROUND_RESULTS" };

export const roundMachine = createMachine<Context, Events>({
  initial: "round",
  context: {
    teams: [],
    time: 60,
    score: 60,
  },
  on: {},
  states: {},
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
});
