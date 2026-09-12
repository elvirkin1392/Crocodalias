import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HatInfo } from '@/components/hat/HatInfo';
import { HatPlay } from '@/components/hat/HatPlay';
import { HatResults } from '@/components/hat/HatResults';
import { FinalResults } from '@/components/round/FinalResults';
import { HatContext } from '@/context/hat';
import { HatSettingsContext } from '@/context/settings';
import { loadWords, shuffle } from '@/dictionaries';
import { HAT_STAGE_SECONDS, isGameComplete } from '@/state/hat';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HatScreen.styles';

type Stage = 'info' | 'play' | 'result' | 'finished';

export function HatScreen() {
  return (
    <HatContext.Provider>
      <Hat />
    </HatContext.Provider>
  );
}

function Hat() {
  const styles = useThemedStyles(createStyles);
  const actor = HatContext.useActorRef();
  const teams = HatContext.useSelector((state) => state.context.teams);
  const hasWords = HatContext.useSelector(
    (state) => state.context.wordPool.length > 0,
  );
  const isComplete = HatContext.useSelector((state) =>
    isGameComplete(state.context),
  );
  const roundTime = HatContext.useSelector(
    (state) => HAT_STAGE_SECONDS[state.context.stage],
  );
  const level = HatSettingsContext.useSelector((state) => state.context.level);
  const teamNames = HatSettingsContext.useSelector(
    (state) => state.context.teams,
  );
  const wordCount = HatSettingsContext.useSelector(
    (state) => state.context.score,
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
        actor.send({
          type: 'UPDATE_WORDS',
          value: shuffle(words).slice(0, wordCount),
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [actor, level, wordCount]);

  const handleQuit = () => router.back();
  const handleStartTurn = () => setStage('play');
  const handleFinishTurn = () => setStage('result');
  const handleFinishGame = () => setStage('finished');
  const handleNextTurn = () => {
    if (isComplete) {
      setStage('finished');
      return;
    }

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
        <HatInfo
          onSubmit={handleStartTurn}
          onClose={handleQuit}
        />
      )}
      {stage === 'play' && (
        <HatPlay
          roundTime={roundTime}
          onFinish={handleFinishTurn}
          onFinishGame={handleFinishGame}
          onQuit={handleQuit}
        />
      )}
      {stage === 'result' && (
        <HatResults
          onSubmit={handleNextTurn}
          onClose={handleQuit}
        />
      )}
      {stage === 'finished' && (
        <FinalResults
          teams={teams}
          onClose={handleQuit}
        />
      )}
    </SafeAreaView>
  );
}
