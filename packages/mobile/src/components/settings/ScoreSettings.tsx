import { useState } from 'react';
import { Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { ScoreButton } from '@/components/settings/ScoreButton';
import { VerticalSlider } from '@/components/settings/VerticalSlider';
import { SCORE_LIMITS } from '@/state/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './ScoreSettings.styles';

const SCORE_STEP = 5;

type ScoreSettingsProps = {
  title: string;
  defaultValue: number;
  onSubmit: (value: number) => void;
  onClose: () => void;
};

export function ScoreSettings({
  title,
  defaultValue,
  onSubmit,
  onClose,
}: ScoreSettingsProps) {
  const [score, setScore] = useState(defaultValue);
  const styles = useThemedStyles(createStyles);

  const handleSubmit = () => onSubmit(score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.slot}>
        <ScoreButton
          value={score}
          onPress={handleSubmit}
        />
      </View>
      <View style={styles.sliderArea}>
        <VerticalSlider
          value={score}
          min={SCORE_LIMITS.min}
          max={SCORE_LIMITS.max}
          step={SCORE_STEP}
          onChange={setScore}
        />
      </View>
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
