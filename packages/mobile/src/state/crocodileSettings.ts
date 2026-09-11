import { LEVELS } from '../enums/settings';
import { createSettingsMachine } from './settings';

export const crocodileSettingsMachine = createSettingsMachine(
  'crocodileSettings',
  {
    level: LEVELS.medium,
    time: 60,
    score: 60,
    teams: ['first', 'second'],
  },
);
