import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Results } from '@/components/round/Results';
import { RoundInfo } from '@/components/round/RoundInfo';
import { RoundPlay } from '@/components/round/RoundPlay';
import { RoundContext } from '@/context/round';
import { AliasSettingsContext } from '@/context/settings';
import { loadWords, shuffle } from '@/dictionaries';
import { styles } from './RoundScreen.styles';

type Stage = 'info' | 'play' | 'result';

export function RoundScreen() {
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
  const level = AliasSettingsContext.useSelector(
    (state) => state.context.level,
  );
  const teamNames = AliasSettingsContext.useSelector(
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

  const handleQuit = () => router.back();
  const handleStartTurn = () => setStage('play');
  const handleFinishTurn = () => setStage('result');
  const handleNextTurn = () => {
    actor.send({ type: 'NEXT_TURN' });
    setStage('info');
  };

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
          onSubmit={handleStartTurn}
          onClose={handleQuit}
        />
      )}
      {stage === 'play' && (
        <RoundPlay
          onFinish={handleFinishTurn}
          onQuit={handleQuit}
        />
      )}
      {stage === 'result' && (
        <Results
          onSubmit={handleNextTurn}
          onClose={handleQuit}
        />
      )}
    </SafeAreaView>
  );
}
