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
    list: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      paddingHorizontal: 32,
      gap: 12,
    },
    add: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      backgroundColor: colors.accent,
    },
    addText: {
      fontSize: 24,
      lineHeight: 24,
      fontWeight: '600',
    },
  });
