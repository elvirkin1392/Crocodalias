import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    time: {
      fontSize: 62,
      color: colors.accent,
    },
  });
