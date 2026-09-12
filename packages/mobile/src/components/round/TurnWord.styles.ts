import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors, isStolen: boolean) =>
  StyleSheet.create({
    wordRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    wordText: {
      fontSize: 18,
      color: isStolen ? colors.danger : undefined,
    },
  });
