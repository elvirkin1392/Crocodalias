import type { Colors } from './colors';
import { useTheme } from './useTheme';

/**
 * Resolves a `createStyles(colors, ...args)` factory against the current
 * theme. Extra args (a variant flag, a selected id, …) are forwarded to
 * `createStyles` so the factory itself decides the resulting style — the
 * component never picks between two style objects.
 */
export function useThemedStyles<Args extends unknown[], T>(
  createStyles: (colors: Colors, ...args: Args) => T,
  ...args: Args
): T {
  const colors = useTheme();

  return createStyles(colors, ...args);
}
