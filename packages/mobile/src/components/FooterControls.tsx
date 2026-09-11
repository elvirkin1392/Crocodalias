import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import closeIcon from '@/assets/icons/close.svg';
import okayIcon from '@/assets/icons/okay.svg';
import { styles } from './FooterControls.styles';

type FooterControlsProps = {
  onClose: () => void;
  onSubmit: () => void;
};

/** Close on the left, confirm on the right — the same pair on every screen. */
export function FooterControls({ onClose, onSubmit }: FooterControlsProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('common.close')}
        hitSlop={16}
        onPress={onClose}
      >
        <Image
          source={closeIcon}
          style={styles.close}
          contentFit="contain"
        />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t('common.done')}
        hitSlop={16}
        onPress={onSubmit}
      >
        <Image
          source={okayIcon}
          style={styles.okay}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}
