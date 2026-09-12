import { useColorScheme } from 'react-native';

import { darkColors, lightColors, type Colors } from './colors';

export function useTheme(): Colors {
  const scheme = useColorScheme();

  return scheme === 'dark' ? darkColors : lightColors;
}
