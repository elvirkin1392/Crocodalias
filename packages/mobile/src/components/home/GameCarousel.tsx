import { useState } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';

import { useThemedStyles } from '@/theme/useThemedStyles';
import { CarouselDot } from './CarouselDot';
import { GameCard } from './GameCard';
import { type Game, GAMES } from './games';
import { createStyles } from './GameCarousel.styles';

type GameCarouselProps = { onSelect: (game: Game) => void };

export function GameCarousel({ onSelect }: GameCarouselProps) {
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const styles = useThemedStyles(createStyles);

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
        {GAMES.map((game, index) => (
          <CarouselDot
            key={game.id}
            isActive={index === page}
          />
        ))}
      </View>
    </View>
  );
}
