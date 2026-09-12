import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './QuitGame.styles';

type QuitGameProps = {
  onFinish: () => void;
  onContinueLater: () => void;
};

export function QuitGame({ onFinish, onContinueLater }: QuitGameProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={onFinish}
      >
        <Text style={styles.buttonText}>{t('quit.finish')}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={onContinueLater}
      >
        <Text style={styles.buttonText}>{t('quit.later')}</Text>
      </Pressable>
    </View>
  );
}
