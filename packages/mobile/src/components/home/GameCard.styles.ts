import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (
  colors: Colors,
  { isDisabled }: { isDisabled: boolean },
) =>
  StyleSheet.create({
    card: {
      flex: 1,
      gap: 16,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDisabled ? colors.disabledSurface : colors.accent,
    },
    name: {
      fontSize: 36,
      fontWeight: '700',
    },
    soon: {
      overflow: 'hidden',
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 12,
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      backgroundColor: colors.surface,
    },
  });
