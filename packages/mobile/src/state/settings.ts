import { assign, setup } from 'xstate';

import { LEVELS } from '../enums/settings';

export type SettingsContext = {
  level: LEVELS;
  time: number;
  score: number;
  teams: string[];
};

export type SettingsEvent =
  | { type: 'OPEN_SCORE_SETTINGS' }
  | { type: 'OPEN_TIME_SETTINGS' }
  | { type: 'OPEN_LEVEL_SETTINGS' }
  | { type: 'OPEN_TEAM_SETTINGS' }
  | { type: 'SUBMIT_SCORE'; value: number }
  | { type: 'SUBMIT_TIME'; value: number }
  | { type: 'SUBMIT_TEAMS'; value: string[] }
  | { type: 'SUBMIT_LEVEL'; value: LEVELS }
  | { type: 'BACK' };

/**
 * Settings screens are the same for every game; only the defaults differ.
 * Each game builds its own machine from this one definition.
 */
export function createSettingsMachine(id: string, defaults: SettingsContext) {
  return setup({
    types: {
      context: {} as SettingsContext,
      events: {} as SettingsEvent,
    },
  }).createMachine({
    id,
    initial: 'generalSettings',
    context: defaults,
    states: {
      generalSettings: {
        on: {
          OPEN_SCORE_SETTINGS: { target: 'scoreSettings' },
          OPEN_TIME_SETTINGS: { target: 'timeSettings' },
          OPEN_LEVEL_SETTINGS: { target: 'levelSettings' },
          OPEN_TEAM_SETTINGS: { target: 'teamSettings' },
        },
      },
      scoreSettings: {
        on: {
          SUBMIT_SCORE: {
            target: 'generalSettings',
            actions: assign({ score: ({ event }) => event.value }),
            guard: ({ context }) => context.score >= 10 && context.score <= 100,
          },
        },
      },
      timeSettings: {
        on: {
          SUBMIT_TIME: {
            target: 'generalSettings',
            actions: assign({ time: ({ event }) => event.value }),
            guard: ({ context }) => context.score >= 10 && context.score <= 5 * 60,
          },
        },
      },
      levelSettings: {
        on: {
          SUBMIT_LEVEL: {
            target: 'generalSettings',
            actions: assign({ level: ({ event }) => event.value }),
          },
        },
      },
      teamSettings: {
        on: {
          SUBMIT_TEAMS: {
            target: 'generalSettings',
            actions: assign({ teams: ({ event }) => event.value }),
          },
        },
      },
    },
    on: {
      BACK: {
        target: '.generalSettings',
      },
    },
  });
}
