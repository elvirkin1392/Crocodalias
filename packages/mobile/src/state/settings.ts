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

export const SCORE_LIMITS = { min: 10, max: 100 };

export const TIME_LIMITS = { min: 10, max: 5 * 60 };

const within = (value: number, { min, max }: { min: number; max: number }) =>
  value >= min && value <= max;

export function createSettingsMachine(
  id: string,
  defaults: SettingsContext,
  /** Alias/Crocodile use this for "points to win"; Hat reuses the same field for word count. */
  scoreLimits: { min: number; max: number } = SCORE_LIMITS,
) {
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
            guard: ({ event }) => within(event.value, scoreLimits),
          },
        },
      },
      timeSettings: {
        on: {
          SUBMIT_TIME: {
            target: 'generalSettings',
            actions: assign({ time: ({ event }) => event.value }),
            guard: ({ event }) => within(event.value, TIME_LIMITS),
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
