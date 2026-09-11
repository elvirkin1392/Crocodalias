import { type LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { styles, THUMB_SIZE } from './VerticalSlider.styles';

type VerticalSliderProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

export function VerticalSlider({
  value,
  min,
  max,
  step,
  onChange,
}: VerticalSliderProps) {
  const trackHeight = useSharedValue(0);
  const ratio = useSharedValue((value - min) / (max - min));

  const handleLayout = (event: LayoutChangeEvent) => {
    trackHeight.set(event.nativeEvent.layout.height);
  };

  const commitValue = (nextRatio: number) => {
    const raw = min + nextRatio * (max - min);
    const stepped = Math.round(raw / step) * step;
    onChange(Math.min(max, Math.max(min, stepped)));
  };

  const updateFromTouch = (y: number) => {
    'worklet';
    const height = trackHeight.get();

    if (height === 0) {
      return;
    }

    const nextRatio = Math.min(1, Math.max(0, 1 - y / height));
    ratio.set(nextRatio);
    scheduleOnRN(commitValue, nextRatio);
  };

  const pan = Gesture.Pan()
    .minDistance(0)
    .onBegin((event) => updateFromTouch(event.y))
    .onUpdate((event) => updateFromTouch(event.y));

  const fillStyle = useAnimatedStyle(() => ({
    height: `${ratio.get() * 100}%`,
  }));
  const thumbStyle = useAnimatedStyle(() => ({
    bottom: `${ratio.get() * 100}%`,
    transform: [{ translateY: THUMB_SIZE / 2 }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <View
        style={styles.touchArea}
        onLayout={handleLayout}
      >
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </GestureDetector>
  );
}
