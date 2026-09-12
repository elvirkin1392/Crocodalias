import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      paddingTop: 16,
      paddingHorizontal: 24,
      fontSize: 28,
      fontWeight: '600',
    },
    about: {
      alignSelf: 'center',
      paddingBottom: 8,
    },
    aboutText: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });
