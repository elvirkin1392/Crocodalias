import type { Colors } from './colors';
import { useTheme } from './useTheme';

/**
 * Resolves a `createStyles(colors)` — or `createStyles(colors, props)` —
 * factory against the current theme. `props` is a plain object naming what
 * the styles vary by (`{ isWinner }`), so the factory decides the resulting
 * style itself — the component never picks between two style objects.
 */
export function useThemedStyles<T>(createStyles: (colors: Colors) => T): T;
export function useThemedStyles<Props extends object, T>(
  createStyles: (colors: Colors, props: Props) => T,
  props: Props,
): T;
export function useThemedStyles(
  createStyles: (colors: Colors, props?: object) => unknown,
  props?: object,
) {
  const colors = useTheme();

  return createStyles(colors, props);
}
