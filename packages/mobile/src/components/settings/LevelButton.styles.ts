import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const CIRCLE_SIZE = 130;
const CAPTION_GAP = 8;
const CAPTION_LINE_HEIGHT = 18;

/** How far the caption below pushes the circle above its slot's center. */
export const CIRCLE_CENTER_OFFSET = (CAPTION_GAP + CAPTION_LINE_HEIGHT) / 2;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      gap: CAPTION_GAP,
    },
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    value: {
      fontSize: 20,
      fontWeight: '600',
    },
    caption: {
      fontSize: 14,
      lineHeight: CAPTION_LINE_HEIGHT,
      color: colors.textMuted,
    },
  });
