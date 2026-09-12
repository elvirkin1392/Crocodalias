import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 40,
    },
    title: {
      fontSize: 16,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: colors.textMuted,
    },
    // Three equal slots: the score and time editors keep their value in the
    // same slot, so it doesn't move when the editor opens.
    slot: {
      flex: 1,
      justifyContent: 'center',
    },
  });
