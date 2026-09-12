import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { LEVELS } from '@/enums/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './LevelOption.styles';

type LevelOptionProps = {
  level: LEVELS;
  isSelected: boolean;
  onPress: (level: LEVELS) => void;
};

export function LevelOption({ level, isSelected, onPress }: LevelOptionProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles, { isSelected });

  const handlePress = () => onPress(level);

  return (
    <Pressable
      style={styles.item}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
    >
      <View style={styles.circle}>
        <Text style={styles.value}>{t(`levels.${level}`)}</Text>
      </View>
    </Pressable>
  );
}
