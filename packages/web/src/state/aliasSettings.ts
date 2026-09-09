import { createMachine, assign } from "xstate";
import { LEVELS } from "../enums/settings";
import type { SettingsContext, SettingsEvent } from "./settings";

export const aliasSettingsMachine = createMachine<
  SettingsContext,
  SettingsEvent
>({
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
          actions: assign({ score: (_context, event) => event.value }),
          cond: (context) => context.score >= 10 && context.score <= 100,
        },
      },
    },
    timeSettings: {
      on: {
        SUBMIT_TIME: {
          target: "generalSettings",
          actions: assign({ time: (_context, event) => event.value }),
          cond: (context) => context.score >= 10 && context.score <= 5 * 60,
        },
      },
    },
    levelSettings: {
      on: {
        SUBMIT_LEVEL: {
          target: "generalSettings",
          actions: assign({ level: (_context, event) => event.value }),
        },
      },
    },
    teamSettings: {
      on: {
        SUBMIT_TEAMS: {
          target: "generalSettings",
          actions: assign({ teams: (_context, event) => event.value }),
        },
      },
    },
  },
  schema: {
    context: {} as SettingsContext,
    events: {} as SettingsEvent,
  },
  on: {
    BACK: {
      target: "generalSettings",
    },
  },
});
