import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import closeIcon from '@/assets/icons/close.svg';
import okayIcon from '@/assets/icons/okay.svg';

type FooterControlsProps = {
  onClose: () => void;
  onSubmit: () => void;
};

/** Close on the left, confirm on the right — the same pair on every screen. */
export function FooterControls({ onClose, onSubmit }: FooterControlsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Закрыть"
        hitSlop={16}
        onPress={onClose}
      >
        <Image source={closeIcon} style={styles.close} contentFit="contain" />
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Готово"
        hitSlop={16}
        onPress={onSubmit}
      >
        <Image source={okayIcon} style={styles.okay} contentFit="contain" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  close: {
    width: 18,
    height: 18,
  },
  okay: {
    width: 24,
    height: 18,
  },
});
