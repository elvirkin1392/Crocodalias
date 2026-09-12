import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    stars: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 14,
    },
    star: {
      width: 24,
      height: 23,
    },
    starRaised: {
      marginBottom: 10,
    },
    value: {
      fontSize: 64,
      fontVariant: ['tabular-nums'],
      color: colors.accent,
    },
    caption: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
