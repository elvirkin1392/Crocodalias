import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { styles } from './WordCountButton.styles';

type WordCountButtonProps = {
  value: number;
  onPress: () => void;
};

export function WordCountButton({ value, onPress }: WordCountButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.container}
      accessibilityRole="button"
      onPress={onPress}
    >
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.caption}>{t('settings.wordCount')}</Text>
    </Pressable>
  );
}
