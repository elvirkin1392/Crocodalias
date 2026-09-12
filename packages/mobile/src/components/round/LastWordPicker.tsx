import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { styles } from './LastWordPicker.styles';
import { type PickerTeam, TeamButton } from './TeamButton';

export type { PickerTeam } from './TeamButton';

type LastWordPickerProps = {
  word: string;
  teams: PickerTeam[];
  onPick: (teamIndex: number) => void;
};

export function LastWordPicker({ word, teams, onPick }: LastWordPickerProps) {
  const { t } = useTranslation();

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
