import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { isPlaying }: { isPlaying: boolean },
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    name: {
      fontSize: 20,
      color: isPlaying ? colors.textPrimary : colors.textSecondary,
      fontWeight: isPlaying ? '600' : undefined,
    },
    score: {
      fontSize: 32,
    },
  });
