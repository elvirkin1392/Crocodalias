import { router } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { GameCarousel } from '@/components/home/GameCarousel';
import type { Game } from '@/components/home/games';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HomeScreen.styles';

export function HomeScreen() {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const handleSelectGame = (game: Game) => {
    if (game.settingsRoute) {
      router.push(game.settingsRoute);
    }
  };
  const handleOpenAbout = () => router.push('/about');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('home.chooseGame')}</Text>
      <GameCarousel onSelect={handleSelectGame} />
      <Pressable
        style={styles.about}
        accessibilityRole="button"
        hitSlop={8}
        onPress={handleOpenAbout}
      >
        <Text style={styles.aboutText}>{t('home.about')}</Text>
      </Pressable>
    </SafeAreaView>
  );
}
