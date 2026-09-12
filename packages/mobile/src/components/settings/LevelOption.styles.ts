import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { isSelected }: { isSelected: boolean },
) =>
  StyleSheet.create({
    option: {
      minWidth: 220,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 14,
      alignItems: 'center',
      backgroundColor: isSelected ? colors.accent : colors.surface,
    },
    optionText: {
      fontSize: 20,
      fontWeight: '600',
    },
  });
