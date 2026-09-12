import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';
import { CIRCLE_SIZE } from './LevelButton.styles';

export const ITEM_HEIGHT = CIRCLE_SIZE + 24;

export const createStyles = (
  colors: Colors,
  { isSelected }: { isSelected: boolean },
) =>
  StyleSheet.create({
    item: {
      height: ITEM_HEIGHT,
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
