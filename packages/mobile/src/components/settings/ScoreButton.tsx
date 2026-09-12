import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import starIcon from '@/assets/icons/star.svg';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './ScoreButton.styles';

type ScoreButtonProps = {
  value: number;
  onPress: () => void;
};

export function ScoreButton({ value, onPress }: ScoreButtonProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      style={styles.container}
      accessibilityRole="button"
      onPress={onPress}
    >
      <View style={styles.stars}>
        <Image
          source={starIcon}
          style={styles.star}
          contentFit="contain"
        />
        <Image
          source={starIcon}
          style={[styles.star, styles.starRaised]}
          contentFit="contain"
        />
        <Image
          source={starIcon}
          style={styles.star}
          contentFit="contain"
        />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.caption}>{t('settings.score')}</Text>
    </Pressable>
  );
}
