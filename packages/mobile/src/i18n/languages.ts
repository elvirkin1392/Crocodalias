export const SUPPORTED_LANGS = ['ru', 'en'] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export const FALLBACK_LANG: Lang = 'en';

export function isLang(value: unknown): value is Lang {
  return SUPPORTED_LANGS.includes(value as Lang);
}

export function pickLang(preferred: (string | null)[]): Lang {
  const supportedLang = preferred.find(isLang);

  return supportedLang ?? FALLBACK_LANG;
}
