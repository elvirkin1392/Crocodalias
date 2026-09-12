import { useState } from 'react';
import { Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { LEVELS } from '@/enums/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { LevelOption } from './LevelOption';
import { createStyles } from './LevelSettings.styles';

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
  const styles = useThemedStyles(createStyles);

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
