import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';
import { CIRCLE_CENTER_OFFSET } from './LevelButton.styles';

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
    // middle slot; the caption offset puts every circle where the overview's
    // level circle sits within its slot.
    pickerContent: {
      alignItems: 'center',
      paddingTop: slotHeight - CIRCLE_CENTER_OFFSET,
      paddingBottom: slotHeight + CIRCLE_CENTER_OFFSET,
    },
  });
