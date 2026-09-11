import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FinalResults } from '@/components/round/FinalResults';
import { Results } from '@/components/round/Results';
import { RoundInfo } from '@/components/round/RoundInfo';
import { RoundPlay } from '@/components/round/RoundPlay';
import { RoundContext } from '@/context/round';
import { loadWords, shuffle } from '@/dictionaries';
import { LEVELS } from '@/enums/settings';
import { hasWinningTeam } from '@/state/round';
import { styles } from './RoundScreen.styles';

type Stage = 'info' | 'play' | 'result' | 'finished';

type RoundScreenProps = {
  level: LEVELS;
  teamNames: string[];
  scoreLimit: number;
  roundTime: number;
  allowSteal: boolean;
  ruleHint?: string;
};

export function RoundScreen(props: RoundScreenProps) {
  return (
    <RoundContext.Provider>
      <Round {...props} />
    </RoundContext.Provider>
  );
}

function Round({
  level,
  teamNames,
  scoreLimit,
  roundTime,
  allowSteal,
  ruleHint,
}: RoundScreenProps) {
  const actor = RoundContext.useActorRef();
  const hasWords = RoundContext.useSelector(
    (state) => state.context.words.length > 0,
  );
  const hasWinner = RoundContext.useSelector((state) =>
    hasWinningTeam(state.context, scoreLimit),
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
  const handleFinishGame = () => setStage('finished');
  const handleNextTurn = () => {
    if (hasWinner) {
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
        <RoundInfo
          ruleHint={ruleHint}
          onSubmit={handleStartTurn}
          onClose={handleQuit}
        />
      )}
      {stage === 'play' && (
        <RoundPlay
          roundTime={roundTime}
          allowSteal={allowSteal}
          onFinish={handleFinishTurn}
          onFinishGame={handleFinishGame}
          onQuit={handleQuit}
        />
      )}
      {stage === 'result' && (
        <Results
          onSubmit={handleNextTurn}
          onClose={handleQuit}
        />
      )}
      {stage === 'finished' && <FinalResults onClose={handleQuit} />}
    </SafeAreaView>
  );
}
