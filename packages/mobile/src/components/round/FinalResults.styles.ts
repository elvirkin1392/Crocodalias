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
    scroll: {
      flexGrow: 1,
      alignSelf: 'stretch',
    },
    list: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 32,
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
