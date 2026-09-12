import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      width: 245,
      height: 420,
      padding: 10,
      borderRadius: 20,
      backgroundColor: colors.cardBack,
    },
    back: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    playIcon: {
      width: 60,
      height: 69,
      marginLeft: 12,
    },
    face: {
      flex: 1,
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
    },
    word: {
      fontSize: 30,
      textAlign: 'center',
    },
  });
