import { LEVELS } from '../enums/settings';
import { createSettingsMachine } from './settings';

export const classicSettingsMachine = createSettingsMachine('classicSettings', {
  level: LEVELS.medium,
  time: 5,
  score: 60,
  teams: ['first', 'second'],
});
