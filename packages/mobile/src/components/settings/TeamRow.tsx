import { Pressable, Text, View } from 'react-native';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TeamRow.styles';

type TeamRowProps = {
  name: string;
  index: number;
  canRemove: boolean;
  onRemove: (index: number) => void;
};

export function TeamRow({ name, index, canRemove, onRemove }: TeamRowProps) {
  const styles = useThemedStyles(createStyles);
  const handlePress = () => onRemove(index);

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      {canRemove && (
        <Pressable
          style={styles.remove}
          accessibilityRole="button"
          onPress={handlePress}
        >
          <Text style={styles.removeText}>−</Text>
        </Pressable>
      )}
    </View>
  );
}
