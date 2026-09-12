import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';
import { CIRCLE_CENTER_OFFSET } from './LevelButton.styles';
import { ITEM_HEIGHT } from './LevelOption.styles';

export const createStyles = (
  colors: Colors,
  { pickerHeight }: { pickerHeight: number },
) => {
  // The picker spans the overview's three slots, so its center is the middle
  // slot's center; shifting by the caption offset puts the centered circle
  // exactly where the level circle sits on the overview.
  const inset = (pickerHeight - ITEM_HEIGHT) / 2;

  return StyleSheet.create({
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
    pickerContent: {
      alignItems: 'center',
      paddingTop: inset - CIRCLE_CENTER_OFFSET,
      paddingBottom: inset + CIRCLE_CENTER_OFFSET,
    },
  });
};
