import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { LEVELS } from '@/enums/settings';
import { styles } from './LevelButton.styles';

type LevelButtonProps = {
  value: LEVELS;
  onPress: () => void;
};

export function LevelButton({ value, onPress }: LevelButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.container}
      accessibilityRole="button"
      onPress={onPress}
    >
      <View style={styles.circle}>
        <Text style={styles.value}>{t(`levels.${value}`)}</Text>
      </View>
      <Text style={styles.caption}>{t('settings.level')}</Text>
    </Pressable>
  );
}
