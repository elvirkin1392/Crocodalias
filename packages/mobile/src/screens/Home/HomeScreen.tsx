import { router } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { GameCarousel } from '@/components/home/GameCarousel';
import { styles } from './HomeScreen.styles';

export function HomeScreen() {
  const { t } = useTranslation();

  // TODO: вести на настройки выбранной игры, когда их перенесём
  const handleSelectGame = () => router.push('/round');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t('home.chooseGame')}</Text>
      <GameCarousel onSelect={handleSelectGame} />
    </SafeAreaView>
  );
}
