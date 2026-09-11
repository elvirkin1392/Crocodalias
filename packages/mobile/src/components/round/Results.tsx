import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { RoundContext } from '@/context/round';
import { currentTeamIndex, nextTeamIndex } from '@/state/round';
import { styles } from './Results.styles';

type ResultsProps = {
  onSubmit: () => void;
  onClose: () => void;
};

/**
 * After a turn: the team that just played and the one that plays next. The
 * list of guessed words arrives together with the swipe cards.
 */
export function Results({ onSubmit, onClose }: ResultsProps) {
  const teams = RoundContext.useSelector((state) => state.context.teams);
  const played = RoundContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );
  const next = RoundContext.useSelector((state) =>
    nextTeamIndex(state.context),
  );

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('results.title')}</Text>

      <Text style={styles.score}>{teams[played]?.totalScore}</Text>
      <Text style={styles.name}>{teams[played]?.name}</Text>

      <View style={styles.divider} />

      <Text style={styles.name}>{teams[next]?.name}</Text>
      <Text style={[styles.score, styles.opponent]}>
        {teams[next]?.totalScore}
      </Text>

      <FooterControls
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </View>
  );
}
