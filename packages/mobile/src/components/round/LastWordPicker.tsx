import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './LastWordPicker.styles';

export type PickerTeam = { index: number; name: string };

type LastWordPickerProps = {
  word: string;
  teams: PickerTeam[];
  onPick: (teamIndex: number) => void;
};

export function LastWordPicker({ word, teams, onPick }: LastWordPickerProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{t('round.whoGuessed', { word })}</Text>
      {teams.map((team) => (
        <TeamButton
          key={team.index}
          team={team}
          onPick={onPick}
        />
      ))}
    </View>
  );
}

type TeamButtonProps = {
  team: PickerTeam;
  onPick: (teamIndex: number) => void;
};

function TeamButton({ team, onPick }: TeamButtonProps) {
  const styles = useThemedStyles(createStyles);
  const handlePress = () => onPick(team.index);

  return (
    <Pressable
      style={styles.team}
      accessibilityRole="button"
      onPress={handlePress}
    >
      <Text style={styles.teamName}>{team.name}</Text>
    </Pressable>
  );
}
