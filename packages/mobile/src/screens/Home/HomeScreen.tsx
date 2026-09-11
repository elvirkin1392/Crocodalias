import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { loadWords } from '@/dictionaries';
import { LEVELS } from '@/enums/settings';
import { styles } from './HomeScreen.styles';

// TODO: заменить на карусель игр, когда её перенесём
export function HomeScreen() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    loadWords(LEVELS.easy).then((words) => setCount(words.length));
  }, []);

  const handleStartGame = () => router.push('/round');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crocodalias</Text>
      <Text style={styles.caption}>
        {count === null ? 'Загружаем слова…' : `Слов в колоде easy: ${count}`}
      </Text>
      <Pressable
        style={styles.button}
        onPress={handleStartGame}
      >
        <Text style={styles.buttonText}>Начать игру</Text>
      </Pressable>
    </View>
  );
}
