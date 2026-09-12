import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { HatContext } from '@/context/hat';
import { currentTeamIndex } from '@/state/hat';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HatResults.styles';
import { TurnWord } from './TurnWord';

type HatResultsProps = {
  onSubmit: () => void;
  onClose: () => void;
};

export function HatResults({ onSubmit, onClose }: HatResultsProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const teams = HatContext.useSelector((state) => state.context.teams);
  const turnLog = HatContext.useSelector((state) => state.context.turnLog);
  const playedIndex = HatContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );
  const playedTeam = teams[playedIndex];

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

      <FooterControls
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </View>
  );
}
