import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { LEVELS } from '@/enums/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './LevelOption.styles';

type LevelOptionProps = {
  level: LEVELS;
  isSelected: boolean;
  onSelect: (level: LEVELS) => void;
};

export function LevelOption({ level, isSelected, onSelect }: LevelOptionProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles, { isSelected });

  const handlePress = () => onSelect(level);

  return (
    <Pressable
      style={styles.option}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
    >
      <Text style={styles.optionText}>{t(`levels.${level}`)}</Text>
    </Pressable>
  );
}
