import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    close: {
      width: 18,
      height: 18,
    },
    content: {
      paddingHorizontal: 24,
      paddingBottom: 40,
      gap: 12,
    },
    title: {
      fontSize: 28,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    sectionTitle: {
      marginTop: 16,
      fontSize: 14,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.textMuted,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      color: colors.textSecondary,
    },
  });
