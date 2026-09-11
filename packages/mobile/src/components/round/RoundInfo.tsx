import { Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { RoundContext } from '@/context/round';
import { currentTeamIndex } from '@/state/round';
import { styles } from './RoundInfo.styles';

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
          <View
            key={`${team.name}-${index}`}
            style={styles.team}
          >
            <Text style={[styles.name, index === playing && styles.playing]}>
              {team.name}
            </Text>
            <Text style={styles.score}>{team.totalScore}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.caption}>Сейчас играет: {teams[playing]?.name}</Text>

      <FooterControls
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </View>
  );
}
