import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import playIcon from '@/assets/icons/play.svg';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './SwipeCard.styles';

const SWIPE_DISTANCE = 60;
const FLY_DISTANCE = 900;
const APPEAR_MS = 150;

type SwipeDirection = 'down' | 'left' | 'up';

type SwipeCardProps = {
  word: string;
  isHidden: boolean;
  canSteal: boolean;
  onPress: () => void;
  onGuessed: () => void;
  onSkipped: () => void;
  onStolen: () => void;
};

export function SwipeCard({
  word,
  isHidden,
  canSteal,
  onPress,
  onGuessed,
  onSkipped,
  onStolen,
}: SwipeCardProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handlersByDirection = {
    down: onGuessed,
    left: onSkipped,
    up: onStolen,
  };

  const handleSwiped = (direction: SwipeDirection) => {
    offsetX.set(0);
    offsetY.set(0);
    opacity.set(withTiming(1, { duration: APPEAR_MS }));
    handlersByDirection[direction]();
  };

  const pan = Gesture.Pan()
    .enabled(!isHidden)
    .onUpdate((event) => {
      const allowedY = canSteal
        ? event.translationY
        : Math.max(0, event.translationY);

      offsetX.set(Math.min(0, event.translationX));
      offsetY.set(allowedY);
    })
    .onEnd((event) => {
      const isVertical =
        Math.abs(event.translationY) > Math.abs(event.translationX);
      const isDown = isVertical && event.translationY > SWIPE_DISTANCE;
      const isUp =
        isVertical && canSteal && event.translationY < -SWIPE_DISTANCE;
      const isLeft = !isVertical && event.translationX < -SWIPE_DISTANCE;

      if (isDown || isUp) {
        const direction: SwipeDirection = isDown ? 'down' : 'up';
        const target = isDown ? FLY_DISTANCE : -FLY_DISTANCE;

        offsetY.set(
          withTiming(target, undefined, () => {
            opacity.set(0);
            scheduleOnRN(handleSwiped, direction);
          }),
        );
        return;
      }

      if (isLeft) {
        offsetX.set(
          withTiming(-FLY_DISTANCE, undefined, () => {
            opacity.set(0);
            scheduleOnRN(handleSwiped, 'left');
          }),
        );
        return;
      }

      offsetX.set(withSpring(0));
      offsetY.set(withSpring(0));
    });

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
    transform: [{ translateX: offsetX.get() }, { translateY: offsetY.get() }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, cardStyle]}>
        {isHidden ? (
          <Pressable
            style={styles.back}
            accessibilityRole="button"
            accessibilityLabel={t('round.startTimer')}
            onPress={onPress}
          >
            <Image
              source={playIcon}
              style={styles.playIcon}
              contentFit="contain"
            />
          </Pressable>
        ) : (
          <View style={styles.face}>
            <Text style={styles.word}>{word}</Text>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
