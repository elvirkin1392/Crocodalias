import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {
      padding: 24,
    },
    card: {
      flex: 1,
      gap: 16,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    cardDisabled: {
      backgroundColor: colors.disabledSurface,
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
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      paddingBottom: 24,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.dotInactive,
    },
    dotActive: {
      backgroundColor: colors.textPrimary,
    },
  });
