import { StyleSheet, Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { RoundContext } from '@/context/round';
import { currentTeamIndex } from '@/state/round';

type RoundInfoProps = {
  onSubmit: () => void;
  onClose: () => void;
};

/** Before every turn: the round number, the scoreboard and who plays next. */
export function RoundInfo({ onSubmit, onClose }: RoundInfoProps) {
  const teams = RoundContext.useSelector((state) => state.context.teams);
  const round = RoundContext.useSelector((state) => state.context.round);
  const playing = RoundContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.round}>Раунд {round}</Text>

      <View style={styles.scoreboard}>
        {teams.map((team, index) => (
          <View key={`${team.name}-${index}`} style={styles.team}>
            <Text style={[styles.name, index === playing && styles.playing]}>
              {team.name}
            </Text>
            <Text style={styles.score}>{team.totalScore}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.caption}>Сейчас играет: {teams[playing]?.name}</Text>

      <FooterControls onClose={onClose} onSubmit={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  round: {
    fontSize: 32,
    color: '#e6bc4e',
  },
  scoreboard: {
    alignSelf: 'stretch',
    marginTop: 40,
    paddingHorizontal: 40,
    gap: 16,
  },
  team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 20,
    color: '#666',
  },
  playing: {
    color: '#000',
    fontWeight: '600',
  },
  score: {
    fontSize: 32,
  },
  caption: {
    marginTop: 40,
    fontSize: 16,
    color: '#b3b3b3',
  },
});
