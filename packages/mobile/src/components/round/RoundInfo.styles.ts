import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 60,
    },
    round: {
      fontSize: 32,
      color: colors.accent,
    },
    scoreboard: {
      alignSelf: 'stretch',
      marginTop: 40,
      paddingHorizontal: 40,
      gap: 16,
    },
    caption: {
      marginTop: 40,
      fontSize: 16,
      color: colors.textMuted,
    },
    ruleHint: {
      marginTop: 16,
      marginHorizontal: 40,
      fontSize: 15,
      textAlign: 'center',
      color: colors.textSecondary,
    },
  });
