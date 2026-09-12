import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors, isSkipped: boolean) =>
  StyleSheet.create({
    wordRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wordText: {
      fontSize: 18,
      color: isSkipped ? colors.textMuted : undefined,
    },
  });
