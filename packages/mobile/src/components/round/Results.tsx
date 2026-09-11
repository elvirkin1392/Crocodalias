import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { RoundContext } from '@/context/round';
import { currentTeamIndex, nextTeamIndex, type TurnEntry } from '@/state/round';
import { styles } from './Results.styles';

type ResultsProps = {
  onSubmit: () => void;
  onClose: () => void;
};

export function Results({ onSubmit, onClose }: ResultsProps) {
  const { t } = useTranslation();
  const teams = RoundContext.useSelector((state) => state.context.teams);
  const turnLog = RoundContext.useSelector((state) => state.context.turnLog);
  const playedIndex = RoundContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );
  const nextIndex = RoundContext.useSelector((state) =>
    nextTeamIndex(state.context),
  );
  const playedTeam = teams[playedIndex];
  const nextTeam = teams[nextIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('results.title')}</Text>

      <Text style={styles.score}>{playedTeam?.totalScore}</Text>
      <Text style={styles.name}>{playedTeam?.name}</Text>

      <ScrollView
        style={styles.words}
        contentContainerStyle={styles.wordsContent}
      >
        {turnLog.map((entry, index) => (
          <TurnWord
            key={`${entry.word}-${index}`}
            entry={entry}
          />
        ))}
      </ScrollView>

      <Text style={styles.name}>{nextTeam?.name}</Text>
      <Text style={[styles.score, styles.opponent]}>
        {nextTeam?.totalScore}
      </Text>

      <FooterControls
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </View>
  );
}

function TurnWord({ entry }: { entry: TurnEntry }) {
  const isStolen = entry.result === 'stolen';
  const isSkipped = entry.result === 'skipped';
  const points = isSkipped ? '−1' : '+1';
  const textStyle = isStolen
    ? [styles.wordText, styles.stolenText]
    : styles.wordText;

  return (
    <View style={styles.wordRow}>
      <Text style={textStyle}>{entry.word}</Text>
      <Text style={textStyle}>{points}</Text>
    </View>
  );
}
