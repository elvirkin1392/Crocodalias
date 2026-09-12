import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Team } from '@/state/round';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './FinalResults.styles';
import { TeamStanding } from './TeamStanding';

type FinalResultsProps = {
  teams: Team[];
  onClose: () => void;
};

export function FinalResults({ teams, onClose }: FinalResultsProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const standings = [...teams].sort((a, b) => b.totalScore - a.totalScore);
  const topScore = standings[0]?.totalScore;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('results.finalTitle')}</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
      >
        {standings.map((team, index) => (
          <TeamStanding
            key={`${team.name}-${index}`}
            team={team}
            isWinner={team.totalScore === topScore}
          />
        ))}
      </ScrollView>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        onPress={onClose}
      >
        <Text style={styles.buttonText}>{t('common.done')}</Text>
      </Pressable>
    </View>
  );
}
