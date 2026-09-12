import { useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { LEVELS } from '@/enums/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { LevelOption } from './LevelOption';
import { createStyles } from './LevelSettings.styles';

const LEVEL_ORDER = Object.values(LEVELS);

/** Score, level and time on the settings overview — the picker reuses its grid. */
const OVERVIEW_SLOT_COUNT = 3;

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
  const [pickerHeight, setPickerHeight] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const slotHeight = pickerHeight / OVERVIEW_SLOT_COUNT;
  const isMeasured = pickerHeight > 0;
  const initialOffset = {
    x: 0,
    y: LEVEL_ORDER.indexOf(defaultValue) * slotHeight,
  };
  const styles = useThemedStyles(createStyles, { slotHeight });

  const handleSubmit = () => onSubmit(level);

  const handleLayout = (event: LayoutChangeEvent) => {
    setPickerHeight(event.nativeEvent.layout.height);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const centeredIndex = Math.round(
      event.nativeEvent.contentOffset.y / slotHeight,
    );
    const clampedIndex = Math.min(
      LEVEL_ORDER.length - 1,
      Math.max(0, centeredIndex),
    );
    setLevel(LEVEL_ORDER[clampedIndex]);
  };

  const handleOptionPress = (item: LEVELS) => {
    if (item === level) {
      onSubmit(item);
      return;
    }

    scrollRef.current?.scrollTo({ y: LEVEL_ORDER.indexOf(item) * slotHeight });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={styles.picker}
        onLayout={handleLayout}
      >
        {isMeasured && (
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.pickerContent}
            contentOffset={initialOffset}
            snapToInterval={slotHeight}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={handleScroll}
          >
            {LEVEL_ORDER.map((item) => (
              <LevelOption
                key={item}
                level={item}
                isSelected={item === level}
                slotHeight={slotHeight}
                onPress={handleOptionPress}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}
