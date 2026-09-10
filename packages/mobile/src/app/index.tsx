import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { loadWords } from '@/dictionaries';
import { LEVELS } from '@/enums/settings';

/**
 * Temporary start screen until the game list is ported. It proves the ported
 * game code and the bundled decks run inside the app, and opens a round.
 */
export default function Index() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    loadWords(LEVELS.easy).then((words) => setCount(words.length));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crocodalias</Text>
      <Text style={styles.caption}>
        {count === null ? 'Загружаем слова…' : `Слов в колоде easy: ${count}`}
      </Text>
      <Pressable style={styles.button} onPress={() => router.push('/round')}>
        <Text style={styles.buttonText}>Начать игру</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  caption: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    backgroundColor: '#e6bc4e',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
