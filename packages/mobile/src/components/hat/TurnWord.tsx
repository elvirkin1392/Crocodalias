import { Text, View } from 'react-native';

import type { HatTurnEntry } from '@/state/hat';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TurnWord.styles';

type TurnWordProps = { entry: HatTurnEntry };

export function TurnWord({ entry }: TurnWordProps) {
  const isSkipped = entry.result === 'skipped';
  const pointsLabel = isSkipped ? '→' : '+1';
  const styles = useThemedStyles(createStyles, isSkipped);

  return (
    <View style={styles.wordRow}>
      <Text style={styles.wordText}>{entry.word}</Text>
      <Text style={styles.wordText}>{pointsLabel}</Text>
    </View>
  );
}
