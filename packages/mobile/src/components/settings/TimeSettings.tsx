import { useState } from 'react';
import { Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { TimeButton } from '@/components/settings/TimeButton';
import { VerticalSlider } from '@/components/settings/VerticalSlider';
import { TIME_LIMITS } from '@/state/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TimeSettings.styles';

const TIME_STEP = 10;

type TimeSettingsProps = {
  title: string;
  defaultValue: number;
  onSubmit: (value: number) => void;
  onClose: () => void;
};

export function TimeSettings({
  title,
  defaultValue,
  onSubmit,
  onClose,
}: TimeSettingsProps) {
  const [time, setTime] = useState(defaultValue);
  const styles = useThemedStyles(createStyles);

  const handleSubmit = () => onSubmit(time);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.sliderArea}>
        <VerticalSlider
          value={time}
          min={TIME_LIMITS.min}
          max={TIME_LIMITS.max}
          step={TIME_STEP}
          onChange={setTime}
        />
      </View>
      <TimeButton
        value={time}
        onPress={handleSubmit}
      />
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
