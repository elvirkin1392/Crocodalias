import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

// Close and + get the same width, so Start sits exactly in the middle.
const SIDE_SIZE = 44;

export const createStyles = (
  colors: Colors,
  { canStart }: { canStart: boolean },
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
    },
    title: {
      alignSelf: 'center',
      fontSize: 16,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.textMuted,
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 32,
      paddingVertical: 24,
      gap: 12,
    },
    couple: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    label: {
      marginHorizontal: 32,
      fontSize: 14,
      color: colors.textMuted,
    },
    input: {
      marginHorizontal: 32,
      marginTop: 8,
      paddingVertical: 12,
      fontSize: 24,
      color: colors.textPrimary,
      borderBottomWidth: 2,
      borderBottomColor: colors.accent,
    },
    bar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 28,
      paddingVertical: 12,
    },
    side: {
      width: SIDE_SIZE,
      height: SIDE_SIZE,
      justifyContent: 'center',
    },
    close: {
      width: 18,
      height: 18,
    },
    start: {
      paddingVertical: 10,
      paddingHorizontal: 28,
      borderRadius: 14,
      backgroundColor: canStart ? colors.accent : colors.disabledSurface,
    },
    startText: {
      fontSize: 18,
      fontWeight: '600',
      color: canStart ? colors.textPrimary : colors.textMuted,
    },
    add: {
      width: SIDE_SIZE,
      height: SIDE_SIZE,
      borderRadius: SIDE_SIZE / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.accent,
    },
    addText: {
      fontSize: 24,
      lineHeight: 24,
      fontWeight: '600',
    },
  });
