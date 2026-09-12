import { StyleSheet } from 'react-native';

import type { Colors } from '@/theme/colors';

export const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {
      padding: 24,
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      paddingBottom: 24,
    },
  });
