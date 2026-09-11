import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { LEVELS } from '@/enums/settings';
import { styles } from './LevelSettings.styles';

const LEVEL_ORDER = Object.values(LEVELS);

type LevelSettingsProps = {
  title: string;
  defaultValue: LEVELS;
  onSubmit: (value: LEVELS) => void;
  onClose: () => void;
};

export function LevelSettings({
  title,
  defaultValue,
  onSubmit,
  onClose,
}: LevelSettingsProps) {
  const [level, setLevel] = useState(defaultValue);

  const handleSubmit = () => onSubmit(level);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.options}>
        {LEVEL_ORDER.map((item) => {
          const isSelected = item === level;

          return (
            <LevelOption
              key={item}
              level={item}
              isSelected={isSelected}
              onSelect={setLevel}
            />
          );
        })}
      </View>
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

type LevelOptionProps = {
  level: LEVELS;
  isSelected: boolean;
  onSelect: (level: LEVELS) => void;
};

function LevelOption({ level, isSelected, onSelect }: LevelOptionProps) {
  const { t } = useTranslation();

  const optionStyle = isSelected
    ? [styles.option, styles.optionSelected]
    : styles.option;

  const handlePress = () => onSelect(level);

  return (
    <Pressable
      style={optionStyle}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
    >
      <Text style={styles.optionText}>{t(`levels.${level}`)}</Text>
    </Pressable>
  );
}
