import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    label: {
      fontSize: 16,
      color: colors.textPrimary,
      textDecorationLine: 'underline',
    },
  });
