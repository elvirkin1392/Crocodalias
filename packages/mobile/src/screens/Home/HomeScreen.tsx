import { router } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { GameCarousel } from '@/components/home/GameCarousel';
import type { Game } from '@/components/home/games';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const { t } = useTranslation();

  const handleSelectGame = (game: Game) => {
    if (game.settingsRoute) {
      router.push(game.settingsRoute);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('home.chooseGame')}</Text>
      <GameCarousel onSelect={handleSelectGame} />
    </SafeAreaView>
  );
}
