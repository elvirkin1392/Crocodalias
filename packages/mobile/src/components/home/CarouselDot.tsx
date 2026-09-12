import { View } from 'react-native';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './CarouselDot.styles';

type CarouselDotProps = { isActive: boolean };

export function CarouselDot({ isActive }: CarouselDotProps) {
  const styles = useThemedStyles(createStyles, { isActive });

  return <View style={styles.dot} />;
}
