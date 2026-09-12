import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 40,
    },
    title: {
      fontSize: 16,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.textMuted,
    },
    // The same three slots as the settings overview, one per stage.
    slot: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    value: {
      fontSize: 44,
      fontVariant: ['tabular-nums'],
      color: colors.accent,
    },
    caption: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
