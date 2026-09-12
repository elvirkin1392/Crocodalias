import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './CrocodilePause.styles';

type CrocodilePauseProps = {
  onResume: () => void;
  onFinish: () => void;
};

/** Hides the word while the phone changes hands or the group takes a break. */
export function CrocodilePause({ onResume, onFinish }: CrocodilePauseProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('crocodile.pause')}</Text>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={onResume}
      >
        <Text style={styles.buttonText}>{t('crocodile.resume')}</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={onFinish}
      >
        <Text style={styles.buttonText}>{t('quit.finish')}</Text>
      </Pressable>
    </View>
  );
}
