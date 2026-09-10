import { LEVELS } from '@/enums/settings';
import { createSettingsMachine } from './settings';

export const aliasSettingsMachine = createSettingsMachine('aliasSettings', {
  level: LEVELS.medium,
  time: 60,
  score: 60,
  teams: ['', ''],
});
