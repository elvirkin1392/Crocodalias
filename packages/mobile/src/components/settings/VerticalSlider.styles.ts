import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const THUMB_SIZE = 28;

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    touchArea: {
      flex: 1,
      width: 60,
      alignItems: 'center',
    },
    track: {
      flex: 1,
      width: 8,
      borderRadius: 4,
      overflow: 'hidden',
      justifyContent: 'flex-end',
      backgroundColor: colors.trackBackground,
    },
    fill: {
      width: '100%',
      borderRadius: 4,
      backgroundColor: colors.accent,
    },
    thumb: {
      position: 'absolute',
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2,
      borderWidth: 3,
      borderColor: colors.surface,
      backgroundColor: colors.accent,
      shadowColor: colors.shadow,
      shadowOpacity: 0.15,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
  });
