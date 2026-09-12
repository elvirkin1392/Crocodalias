import { Linking, Pressable, Text } from 'react-native';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './ExternalLink.styles';

type ExternalLinkProps = {
  label: string;
  url: string;
};

/** Opens the page in the device's browser. */
export function ExternalLink({ label, url }: ExternalLinkProps) {
  const styles = useThemedStyles(createStyles);

  const handlePress = () => Linking.openURL(url);

  return (
    <Pressable
      accessibilityRole="link"
      hitSlop={8}
      onPress={handlePress}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
