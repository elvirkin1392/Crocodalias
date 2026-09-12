import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CrocodilePlay } from '@/components/crocodile/CrocodilePlay';
import { CrocodileResults } from '@/components/crocodile/CrocodileResults';
import { CrocodileContext } from '@/context/crocodile';
import { CrocodileSettingsContext } from '@/context/settings';
import { loadWords, shuffle } from '@/dictionaries';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './CrocodileRoundScreen.styles';

export function CrocodileRoundScreen() {
  return (
    <CrocodileContext.Provider>
      <Crocodile />
    </CrocodileContext.Provider>
  );
}

function Crocodile() {
  const styles = useThemedStyles(createStyles);
  const actor = CrocodileContext.useActorRef();
  const hasWords = CrocodileContext.useSelector(
    (state) => state.context.words.length > 0,
  );
  const isFinished = CrocodileContext.useSelector((state) =>
    state.matches('finished'),
  );
  const level = CrocodileSettingsContext.useSelector(
    (state) => state.context.level,
  );

  useEffect(() => {
    let cancelled = false;

    loadWords(level).then((words) => {
      if (!cancelled) {
        actor.send({ type: 'UPDATE_WORDS', value: shuffle(words) });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [actor, level]);

  const handleClose = () => router.back();

  if (!hasWords) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFinished ? (
        <CrocodileResults onClose={handleClose} />
      ) : (
        <CrocodilePlay />
      )}
    </SafeAreaView>
  );
}
