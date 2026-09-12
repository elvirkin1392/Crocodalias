import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './Timer.styles';

type TimerProps = {
  secondsLeft: number;
  isDisabled: boolean;
  onPress: () => void;
};

export function Timer({ secondsLeft, isDisabled, onPress }: TimerProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('round.timer', { seconds: secondsLeft })}
      disabled={isDisabled}
      hitSlop={16}
      onPress={onPress}
    >
      <Text style={styles.time}>{secondsLeft}</Text>
    </Pressable>
  );
}
