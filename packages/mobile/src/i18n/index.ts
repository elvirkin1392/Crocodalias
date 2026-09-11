// Hermes has no Intl.PluralRules, and i18next needs it for plural keys.
import '@formatjs/intl-pluralrules/polyfill-force.js';
import '@formatjs/intl-pluralrules/locale-data/en.js';
import '@formatjs/intl-pluralrules/locale-data/ru.js';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { FALLBACK_LANG } from './languages';
import en from './locales/en.json';
import ru from './locales/ru.json';

export const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: FALLBACK_LANG,
  fallbackLng: FALLBACK_LANG,
  interpolation: { escapeValue: false },
});
