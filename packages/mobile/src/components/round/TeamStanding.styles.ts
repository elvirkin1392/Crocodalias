import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { isWinner }: { isWinner: boolean },
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      alignSelf: 'stretch',
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 14,
      backgroundColor: isWinner ? colors.accent : undefined,
    },
    name: {
      fontSize: 20,
      fontWeight: isWinner ? '700' : undefined,
    },
    score: {
      fontSize: 28,
      fontWeight: isWinner ? '700' : undefined,
    },
  });
