import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: 8,
    },
    circle: {
      width: 130,
      height: 130,
      borderRadius: 65,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    value: {
      fontSize: 20,
      fontWeight: '600',
    },
    caption: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
