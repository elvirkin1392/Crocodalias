import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors, canSteal: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.playBackground,
    },
    header: {
      alignSelf: 'stretch',
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    closeIcon: {
      width: 14,
      height: 14,
      opacity: 0.3,
    },
    opponent: {
      fontSize: 20,
      color: canSteal ? colors.textPrimary : colors.textMuted,
    },
    cardArea: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
    },
    showTime: {
      alignItems: 'center',
      gap: 16,
    },
    showTimeText: {
      fontSize: 44,
    },
    footer: {
      alignSelf: 'stretch',
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
    },
    team: {
      fontSize: 20,
    },
    timer: {
      position: 'absolute',
      right: 24,
      bottom: 4,
    },
  });
