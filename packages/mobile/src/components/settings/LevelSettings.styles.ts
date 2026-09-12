import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { slotHeight }: { slotHeight: number },
) =>
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
    picker: {
      flex: 1,
      alignSelf: 'stretch',
    },
    // An empty slot above and below lets the first and last level reach the
    // middle slot.
    pickerContent: {
      alignItems: 'center',
      paddingVertical: slotHeight,
    },
  });
