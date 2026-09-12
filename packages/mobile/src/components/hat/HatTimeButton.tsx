import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import timeIcon from '@/assets/icons/time.svg';
import { HAT_STAGE_SECONDS, HAT_STAGES } from '@/state/hat';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HatTimeButton.styles';

const STAGE_TIMES_LABEL = HAT_STAGES.map(
  (stage) => HAT_STAGE_SECONDS[stage],
).join('/');

type HatTimeButtonProps = {
  onPress: () => void;
};

export function HatTimeButton({ onPress }: HatTimeButtonProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

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
        <Text style={styles.value}>{STAGE_TIMES_LABEL}</Text>
      </View>
      <Text style={styles.caption}>{t('settings.time')}</Text>
    </Pressable>
  );
}
