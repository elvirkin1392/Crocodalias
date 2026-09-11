import { LEVELS } from '../enums/settings';
import { createSettingsMachine } from './settings';

/** The "score" field of the shared settings machine is reused as word count. */
export const HAT_WORD_COUNT_LIMITS = { min: 10, max: 40 };

export const hatSettingsMachine = createSettingsMachine(
  'hatSettings',
  {
    level: LEVELS.medium,
    time: 60,
    score: 20,
    teams: ['first', 'second'],
  },
  HAT_WORD_COUNT_LIMITS,
);
