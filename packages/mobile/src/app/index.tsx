import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { loadWords } from '@/dictionaries';
import { LEVELS } from '@/enums/settings';

/**
 * Temporary start screen until the game screens are ported. It proves the
 * ported game code and the bundled decks actually run inside the app.
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
});
