import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { ShownWordEntry } from '@/state/crocodile';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './ShownWord.styles';

type ShownWordProps = {
  entry: ShownWordEntry;
};

export function ShownWord({ entry }: ShownWordProps) {
  const { t } = useTranslation();
  const isSkipped = entry.result === 'skipped';
  const styles = useThemedStyles(createStyles, { isSkipped });

  return (
    <View style={styles.row}>
      <Text style={styles.word}>{entry.word}</Text>
      {isSkipped && <Text style={styles.label}>{t('crocodile.skipped')}</Text>}
    </View>
  );
}
