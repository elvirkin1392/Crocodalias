import { Pressable, Text } from 'react-native';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './TeamButton.styles';

export type PickerTeam = { index: number; name: string };

type TeamButtonProps = {
  team: PickerTeam;
  onPick: (teamIndex: number) => void;
};

export function TeamButton({ team, onPick }: TeamButtonProps) {
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
