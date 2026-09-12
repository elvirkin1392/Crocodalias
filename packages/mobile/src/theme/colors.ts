export type Colors = {
  /** The one brand color: buttons, highlights, progress. */
  accent: string;
  /** Screen-level background. */
  background: string;
  /** Elevated surfaces: cards, pills, buttons sitting on `background`. */
  surface: string;
  /** A second, slightly different surface — e.g. a row inside a card. */
  surfaceAlt: string;
  textPrimary: string;
  textSecondary: string;
  /** Captions, hints — the lightest text. */
  textMuted: string;
  danger: string;
  /** The active-turn screen background (Alias/Crocodile/Hat). */
  playBackground: string;
  /** The word card's hidden side. */
  cardBack: string;
  trackBackground: string;
  disabledSurface: string;
  dotInactive: string;
  shadow: string;
};

// TODO: tune real dark values once the dark theme is designed — for now it
// mirrors light so every screen can already read colors from the theme.
export const lightColors: Colors = {
  accent: '#e6bc4e',
  background: '#fff',
  surface: '#fff',
  surfaceAlt: '#f3f3f3',
  textPrimary: '#000',
  textSecondary: '#666',
  textMuted: '#b3b3b3',
  danger: '#d64545',
  playBackground: '#eaf7db',
  cardBack: '#68877c',
  trackBackground: '#eee',
  disabledSurface: '#e4e4e4',
  dotInactive: '#ccc',
  shadow: '#000',
};

export const darkColors: Colors = { ...lightColors };
