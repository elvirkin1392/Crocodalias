import { useMemo } from 'react';

import type { Colors } from './colors';
import { useTheme } from './useTheme';

/** Resolves a `createStyles(colors)` factory against the current theme. */
export function useThemedStyles<T>(createStyles: (colors: Colors) => T): T {
  const colors = useTheme();

  return useMemo(() => createStyles(colors), [createStyles, colors]);
}
