import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PlayPlaceholder } from '@/components/round/PlayPlaceholder';
import { Results } from '@/components/round/Results';
import { RoundInfo } from '@/components/round/RoundInfo';
import { RoundContext } from '@/context/round';
import { ClassicSettingsContext } from '@/context/settings';
import { loadWords, shuffle } from '@/dictionaries';
import { styles } from '@/styles/round.styles';

type Stage = 'info' | 'play' | 'result';

export default function RoundScreen() {
  return (
    <RoundContext.Provider>
      <Round />
    </RoundContext.Provider>
  );
}

function Round() {
  const actor = RoundContext.useActorRef();
  const hasWords = RoundContext.useSelector(
    (state) => state.context.words.length > 0,
  );
  const level = ClassicSettingsContext.useSelector(
    (state) => state.context.level,
  );
  const teamNames = ClassicSettingsContext.useSelector(
    (state) => state.context.teams,
  );
  const [stage, setStage] = useState<Stage>('info');

  useEffect(() => {
    actor.send({
      type: 'SET_TEAMS',
      value: teamNames.map((name) => ({ name, totalScore: 0 })),
    });
  }, [actor, teamNames]);

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

  const quit = () => router.back();

  if (!hasWords) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {stage === 'info' && (
        <RoundInfo
          onSubmit={() => setStage('play')}
          onClose={quit}
        />
      )}
      {stage === 'play' && (
        <PlayPlaceholder
          onFinish={() => setStage('result')}
          onClose={quit}
        />
      )}
      {stage === 'result' && (
        <Results
          onSubmit={() => {
            actor.send({ type: 'NEXT_TURN' });
            setStage('info');
          }}
          onClose={quit}
        />
      )}
    </SafeAreaView>
  );
}
