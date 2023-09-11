import { createMachine, assign } from "xstate";
import { LEVELS } from "../enums/settings";

type Context = { level: LEVELS; time: number; score: number, teams: [string, string] };
type Events =
  | { type: "OPEN_SCORE_SETTINGS" }
  | { type: "OPEN_TIME_SETTINGS" }
  | { type: "OPEN_LEVEL_SETTINGS" }
  | { type: "OPEN_TEAM_SETTINGS" }
  | { type: "SUBMIT_SCORE"; value: number }
  | { type: "SUBMIT_TIME"; value: number }
  | { type: "SUBMIT_TEAMS"; value: [string] }
  | { type: "SUBMIT_LEVEL"; value: LEVELS }
  | { type: "BACK" };

export const classicSettingsMachine = createMachine<Context, Events>({
  initial: "generalSettings",
  context: {
    level: LEVELS.medium,
    time: 60,
    score: 60,
    teams: ["", ""],
  },
  states: {
    generalSettings: {
      on: {
        OPEN_SCORE_SETTINGS: { target: "scoreSettings" },
        OPEN_TIME_SETTINGS: { target: "timeSettings" },
        OPEN_LEVEL_SETTINGS: { target: "levelSettings" },
        OPEN_TEAM_SETTINGS: { target: "teamSettings" },
      },
    },
    scoreSettings: {
      on: {
        SUBMIT_SCORE: {
          target: "generalSettings",
          actions: assign({ score: (context, event) => event.value }),
          cond: (context) => context.score >= 10 && context.score <= 100,
        },
      },
    },
    timeSettings: {
      on: {
        SUBMIT_TIME: {
          target: "generalSettings",
          actions: assign({ time: (context, event) => event.value }),
          cond: (context) => context.score >= 10 && context.score <= 5 * 60,
        },
      },
    },
    levelSettings: {
      on: {
        SUBMIT_LEVEL: {
          target: "generalSettings",
          actions: assign({ level: (context, event) => event.value }),
        },
      },
    },
    teamSettings: {
      on: {
        SUBMIT_TEAMS: {
          target: "generalSettings",
          actions: assign({ teams: (context, event) => event.value }),
        },
      },
    },
  },
  on: {
    BACK: {
      target: "generalSettings",
    },
  },
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
});
