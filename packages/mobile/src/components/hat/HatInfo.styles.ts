import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
    },
    stage: {
      fontSize: 28,
      color: colors.accent,
    },
    stageRule: {
      marginTop: 8,
      marginHorizontal: 40,
      fontSize: 16,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    scoreboard: {
      alignSelf: 'stretch',
      marginTop: 32,
      paddingHorizontal: 40,
      gap: 16,
    },
    caption: {
      marginTop: 32,
      fontSize: 16,
      color: colors.textMuted,
    },
    wordsLeft: {
      marginTop: 8,
      fontSize: 14,
      color: colors.textMuted,
    },
  });
