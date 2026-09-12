import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
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
