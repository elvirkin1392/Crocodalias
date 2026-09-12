import { Text, View } from 'react-native';

import type { TurnEntry } from '@/state/round';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TurnWord.styles';

type TurnWordProps = {
  entry: TurnEntry;
  teamName?: string;
};

export function TurnWord({ entry, teamName }: TurnWordProps) {
  const isStolen = entry.result === 'stolen';
  const isSkipped = entry.result === 'skipped';
  const points = isSkipped ? '−1' : '+1';
  const pointsLabel = isStolen ? `${teamName} ${points}` : points;
  const styles = useThemedStyles(createStyles, { isStolen });

  return (
    <View style={styles.wordRow}>
      <Text style={styles.wordText}>{entry.word}</Text>
      <Text style={styles.wordText}>{pointsLabel}</Text>
    </View>
  );
}
