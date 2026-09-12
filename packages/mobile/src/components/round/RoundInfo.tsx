import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { TeamScoreRow } from '@/components/TeamScoreRow';
import { RoundContext } from '@/context/round';
import { currentTeamIndex } from '@/state/round';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './RoundInfo.styles';

type RoundInfoProps = {
  ruleHint?: string;
  onSubmit: () => void;
  onClose: () => void;
};

/** Before every turn: the round number, the scoreboard and who plays next. */
export function RoundInfo({ ruleHint, onSubmit, onClose }: RoundInfoProps) {
  const teams = RoundContext.useSelector((state) => state.context.teams);
  const round = RoundContext.useSelector((state) => state.context.round);
  const playing = RoundContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );

  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const playingTeamName = teams[playing]?.name;

  return (
    <View style={styles.container}>
      <Text style={styles.round}>{t('round.title', { number: round })}</Text>

      <View style={styles.scoreboard}>
        {teams.map((team, index) => (
          <TeamScoreRow
            key={`${team.name}-${index}`}
            name={team.name}
            score={team.totalScore}
            isPlaying={index === playing}
          />
        ))}
      </View>

      <Text style={styles.caption}>
        {t('round.nowPlaying', { team: playingTeamName })}
      </Text>

      {ruleHint && <Text style={styles.ruleHint}>{ruleHint}</Text>}

      <FooterControls
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </View>
  );
}
