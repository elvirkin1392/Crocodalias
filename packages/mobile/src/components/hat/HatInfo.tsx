import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { HatContext } from '@/context/hat';
import { currentTeamIndex } from '@/state/hat';
import { styles } from './HatInfo.styles';

type HatInfoProps = {
  onSubmit: () => void;
  onClose: () => void;
};

/** Before every turn: the stage, its rule, the scoreboard and who plays next. */
export function HatInfo({ onSubmit, onClose }: HatInfoProps) {
  const teams = HatContext.useSelector((state) => state.context.teams);
  const stage = HatContext.useSelector((state) => state.context.stage);
  const wordsLeft = HatContext.useSelector(
    (state) => state.context.queue.length,
  );
  const playing = HatContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );

  const { t } = useTranslation();
  const playingTeamName = teams[playing]?.name;

  return (
    <View style={styles.container}>
      <Text style={styles.stage}>{t('hat.stageTitle', { stage })}</Text>
      <Text style={styles.stageRule}>{t(`hat.stage${stage}`)}</Text>

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

      <Text style={styles.caption}>
        {t('round.nowPlaying', { team: playingTeamName })}
      </Text>
      <Text style={styles.wordsLeft}>
        {t('hat.wordsLeft', { count: wordsLeft })}
      </Text>

      <FooterControls
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </View>
  );
}
