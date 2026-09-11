import { getLocales } from 'expo-localization';

import { pickLang, type Lang } from './languages';

export function detectDeviceLang(): Lang {
  const preferred = getLocales().map((locale) => locale.languageCode);

  return pickLang(preferred);
}
