import { Pressable, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@/theme/useThemedStyles';
import type { Game } from './games';
import { createStyles } from './GameCard.styles';

type GameCardProps = {
  game: Game;
  onSelect: (game: Game) => void;
};

export function GameCard({ game, onSelect }: GameCardProps) {
  const { t } = useTranslation();
  const isDisabled = !game.settingsRoute;
  const styles = useThemedStyles(createStyles, isDisabled);

  const handlePress = () => onSelect(game);

  return (
    <Pressable
      style={styles.card}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={handlePress}
    >
      <Text style={styles.name}>{t(`games.${game.id}`)}</Text>
      {isDisabled && <Text style={styles.soon}>{t('home.soon')}</Text>}
    </Pressable>
  );
}
