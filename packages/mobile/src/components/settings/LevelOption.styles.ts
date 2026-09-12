import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';
import { CIRCLE_SIZE } from './LevelButton.styles';

export const createStyles = (
  colors: Colors,
  { isSelected, slotHeight }: { isSelected: boolean; slotHeight: number },
) =>
  StyleSheet.create({
    item: {
      height: slotHeight,
      justifyContent: 'center',
    },
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
      opacity: isSelected ? 1 : 0.35,
    },
    value: {
      fontSize: 20,
      fontWeight: '600',
    },
  });
