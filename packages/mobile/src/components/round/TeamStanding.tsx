import { Text, View } from 'react-native';

import type { Team } from '@/state/round';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TeamStanding.styles';

type TeamStandingProps = {
  team: Team;
  isWinner: boolean;
};

export function TeamStanding({ team, isWinner }: TeamStandingProps) {
  const styles = useThemedStyles(createStyles, isWinner);

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{team.name}</Text>
      <Text style={styles.score}>{team.totalScore}</Text>
    </View>
  );
}
