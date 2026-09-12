import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { isActive }: { isActive: boolean },
) =>
  StyleSheet.create({
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: isActive ? colors.textPrimary : colors.dotInactive,
    },
  });
