import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { isSkipped }: { isSkipped: boolean },
) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    word: {
      fontSize: 18,
      color: isSkipped ? colors.textMuted : colors.textPrimary,
    },
    label: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
