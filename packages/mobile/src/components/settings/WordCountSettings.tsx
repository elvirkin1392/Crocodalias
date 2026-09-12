import { useState } from 'react';
import { Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { VerticalSlider } from '@/components/settings/VerticalSlider';
import { WordCountButton } from '@/components/settings/WordCountButton';
import { HAT_WORD_COUNT_LIMITS } from '@/state/hatSettings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './WordCountSettings.styles';

const WORD_COUNT_STEP = 5;

type WordCountSettingsProps = {
  title: string;
  defaultValue: number;
  onSubmit: (value: number) => void;
  onClose: () => void;
};

export function WordCountSettings({
  title,
  defaultValue,
  onSubmit,
  onClose,
}: WordCountSettingsProps) {
  const [count, setCount] = useState(defaultValue);
  const styles = useThemedStyles(createStyles);

  const handleSubmit = () => onSubmit(count);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <WordCountButton
        value={count}
        onPress={handleSubmit}
      />
      <View style={styles.sliderArea}>
        <VerticalSlider
          value={count}
          min={HAT_WORD_COUNT_LIMITS.min}
          max={HAT_WORD_COUNT_LIMITS.max}
          step={WORD_COUNT_STEP}
          onChange={setCount}
        />
      </View>
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
