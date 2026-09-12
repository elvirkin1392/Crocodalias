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
    // Takes the two slots of score and level, so the time stays exactly
    // where it was on the settings overview. No padding or margin: Yoga
    // subtracts them before splitting the flex space, shifting the time.
    sliderArea: {
      flex: 2,
      alignItems: 'center',
    },
    slot: {
      flex: 1,
      justifyContent: 'center',
    },
  });
