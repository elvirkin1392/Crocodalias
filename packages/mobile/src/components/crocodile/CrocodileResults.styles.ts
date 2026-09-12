import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 60,
    },
    title: {
      fontSize: 20,
      textTransform: 'uppercase',
      color: colors.textMuted,
    },
    summary: {
      marginTop: 12,
      fontSize: 32,
      color: colors.accent,
    },
    scroll: {
      flexGrow: 1,
      alignSelf: 'stretch',
      marginVertical: 24,
    },
    list: {
      paddingHorizontal: 40,
      gap: 12,
    },
    button: {
      marginBottom: 40,
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 14,
      backgroundColor: colors.accent,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: '600',
    },
  });
