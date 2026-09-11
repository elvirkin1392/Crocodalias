import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import timeIcon from '@/assets/icons/time.svg';
import { styles } from './TimeButton.styles';

type TimeButtonProps = {
  value: number;
  onPress: () => void;
};

export function TimeButton({ value, onPress }: TimeButtonProps) {
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.container}
      accessibilityRole="button"
      onPress={onPress}
    >
      <View style={styles.clock}>
        <Image
          source={timeIcon}
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.caption}>{t('settings.time')}</Text>
    </Pressable>
  );
}
