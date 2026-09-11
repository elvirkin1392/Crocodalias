import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { getRandomTeams } from '@/mocks/teams';
import { styles } from './TeamsSettings.styles';

const MIN_TEAMS = 2;

type TeamsSettingsProps = {
  title: string;
  defaultValue: string[];
  onSubmit: (value: string[]) => void;
  onClose: () => void;
};

export function TeamsSettings({
  title,
  defaultValue,
  onSubmit,
  onClose,
}: TeamsSettingsProps) {
  const { t } = useTranslation();
  const namePool = t('teamNames', { returnObjects: true }) as string[];
  const [teams, setTeams] = useState(() =>
    getRandomTeams(Math.max(defaultValue.length, MIN_TEAMS), namePool),
  );

  const canRemove = teams.length > MIN_TEAMS;

  const handleAdd = () => setTeams([...teams, ...getRandomTeams(1, namePool)]);
  const handleRemove = (index: number) =>
    setTeams(teams.filter((_, teamIndex) => teamIndex !== index));
  const handleSubmit = () => onSubmit(teams);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.list}>
        {teams.map((team, index) => (
          <TeamRow
            key={`${team}-${index}`}
            name={team}
            index={index}
            canRemove={canRemove}
            onRemove={handleRemove}
          />
        ))}
      </View>
      <Pressable
        style={styles.add}
        accessibilityRole="button"
        onPress={handleAdd}
      >
        <Text style={styles.addText}>+</Text>
      </Pressable>
      <FooterControls
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

type TeamRowProps = {
  name: string;
  index: number;
  canRemove: boolean;
  onRemove: (index: number) => void;
};

function TeamRow({ name, index, canRemove, onRemove }: TeamRowProps) {
  const handlePress = () => onRemove(index);

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      {canRemove && (
        <Pressable
          style={styles.remove}
          accessibilityRole="button"
          onPress={handlePress}
        >
          <Text style={styles.removeText}>−</Text>
        </Pressable>
      )}
    </View>
  );
}
