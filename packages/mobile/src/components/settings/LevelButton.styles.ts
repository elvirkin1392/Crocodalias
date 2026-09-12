import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const CIRCLE_SIZE = 130;
const CAPTION_GAP = 8;
const CAPTION_LINE_HEIGHT = 18;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    // The top padding mirrors the caption below, so the circle itself sits on
    // its slot's center — the same line the level wheel and the score and
    // time blocks are centered on.
    container: {
      alignItems: 'center',
      gap: CAPTION_GAP,
      paddingTop: CAPTION_GAP + CAPTION_LINE_HEIGHT,
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
