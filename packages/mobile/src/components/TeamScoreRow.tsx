import { Text, View } from 'react-native';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TeamScoreRow.styles';

type TeamScoreRowProps = {
  name: string;
  score: number;
  isPlaying: boolean;
};

export function TeamScoreRow({ name, score, isPlaying }: TeamScoreRowProps) {
  const styles = useThemedStyles(createStyles, isPlaying);

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}
