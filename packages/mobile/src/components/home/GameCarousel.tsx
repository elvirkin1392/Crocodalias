import { useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { type Game, GAMES } from './games';
import { styles } from './GameCarousel.styles';

type GameCarouselProps = { onSelect: (game: Game) => void };

export function GameCarousel({ onSelect }: GameCarouselProps) {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.x;
    setPage(Math.round(offset / width));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {GAMES.map((game) => (
          <View
            key={game.id}
            style={[styles.page, { width }]}
          >
            <GameCard
              game={game}
              onSelect={onSelect}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {GAMES.map((game, index) => {
          const isActive = index === page;
          const dotStyle = isActive
            ? [styles.dot, styles.dotActive]
            : styles.dot;

          return (
            <View
              key={game.id}
              style={dotStyle}
            />
          );
        })}
      </View>
    </View>
  );
}

type GameCardProps = {
  game: Game;
  onSelect: (game: Game) => void;
};

function GameCard({ game, onSelect }: GameCardProps) {
  const { t } = useTranslation();

  const isDisabled = !game.settingsRoute;
  const cardStyle = isDisabled
    ? [styles.card, styles.cardDisabled]
    : styles.card;

  const handlePress = () => onSelect(game);

  return (
    <Pressable
      style={cardStyle}
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
