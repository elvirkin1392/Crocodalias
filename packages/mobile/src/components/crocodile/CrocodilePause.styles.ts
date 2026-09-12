import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 38,
    },
    title: {
      fontSize: 20,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.textMuted,
    },
    button: {
      width: 180,
      height: 180,
      borderRadius: 90,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
