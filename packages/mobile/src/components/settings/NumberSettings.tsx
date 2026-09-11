import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { styles } from './NumberSettings.styles';

type NumberSettingsProps = {
  title: string;
  defaultValue: number;
  limits: { min: number; max: number };
  step: number;
  onSubmit: (value: number) => void;
  onClose: () => void;
};

export function NumberSettings({
  title,
  defaultValue,
  limits,
  step,
  onSubmit,
  onClose,
}: NumberSettingsProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);

  const canDecrease = value > limits.min;
  const canIncrease = value < limits.max;
  const decreaseStyle = canDecrease
    ? styles.step
    : [styles.step, styles.stepDisabled];
  const increaseStyle = canIncrease
    ? styles.step
    : [styles.step, styles.stepDisabled];

  const handleDecrease = () => setValue(Math.max(limits.min, value - step));
  const handleIncrease = () => setValue(Math.min(limits.max, value + step));
  const handleSubmit = () => onSubmit(value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.stepper}>
        <Pressable
          style={decreaseStyle}
          accessibilityRole="button"
          accessibilityLabel={t('settings.decrease')}
          disabled={!canDecrease}
          onPress={handleDecrease}
        >
          <Text style={styles.stepText}>−</Text>
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable
          style={increaseStyle}
          accessibilityRole="button"
          accessibilityLabel={t('settings.increase')}
          disabled={!canIncrease}
          onPress={handleIncrease}
        >
          <Text style={styles.stepText}>+</Text>
        </Pressable>
      </View>
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
