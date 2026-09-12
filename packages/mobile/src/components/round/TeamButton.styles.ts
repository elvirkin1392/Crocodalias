import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    team: {
      minWidth: 200,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 14,
      alignItems: 'center',
      backgroundColor: colors.accent,
    },
    teamName: {
      fontSize: 18,
      fontWeight: '600',
    },
  });
