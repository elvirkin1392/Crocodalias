import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
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
    pauseIcon: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      gap: 4,
      opacity: 0.3,
    },
    pauseBar: {
      width: 4,
      height: 16,
      borderRadius: 1,
      backgroundColor: colors.textPrimary,
    },
    hint: {
      marginHorizontal: 40,
      fontSize: 15,
      textAlign: 'center',
      color: colors.textSecondary,
    },
    cardArea: {
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footer: {
      alignSelf: 'stretch',
      height: 90,
      justifyContent: 'center',
    },
  });
