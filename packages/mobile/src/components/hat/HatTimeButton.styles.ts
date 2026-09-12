import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    clock: {
      width: 140,
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 16,
    },
    icon: {
      ...StyleSheet.absoluteFill,
    },
    value: {
      fontSize: 16,
      fontVariant: ['tabular-nums'],
      color: colors.accent,
    },
    caption: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
