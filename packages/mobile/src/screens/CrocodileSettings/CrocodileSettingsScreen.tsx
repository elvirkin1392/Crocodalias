import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GameSettingsView } from '@/components/settings/GameSettingsView';
import { CrocodileSettingsContext } from '@/context/settings';
import { LEVELS } from '@/enums/settings';
import { styles } from './CrocodileSettingsScreen.styles';

export function CrocodileSettingsScreen() {
  const actor = CrocodileSettingsContext.useActorRef();
  const { score, level, time, teams } = CrocodileSettingsContext.useSelector(
    (state) => state.context,
  );
  const isScoreOpen = CrocodileSettingsContext.useSelector((state) =>
    state.matches('scoreSettings'),
  );
  const isLevelOpen = CrocodileSettingsContext.useSelector((state) =>
    state.matches('levelSettings'),
  );
  const isTimeOpen = CrocodileSettingsContext.useSelector((state) =>
    state.matches('timeSettings'),
  );
  const isTeamsOpen = CrocodileSettingsContext.useSelector((state) =>
    state.matches('teamSettings'),
  );

  // The settings machine outlives this screen: start from the overview
  // even if the last visit was left from inside an editor.
  useEffect(() => {
    actor.send({ type: 'BACK' });
  }, [actor]);

  const handleOpenScore = () => actor.send({ type: 'OPEN_SCORE_SETTINGS' });
  const handleOpenLevel = () => actor.send({ type: 'OPEN_LEVEL_SETTINGS' });
  const handleOpenTime = () => actor.send({ type: 'OPEN_TIME_SETTINGS' });
  const handleOpenTeams = () => actor.send({ type: 'OPEN_TEAM_SETTINGS' });
  const handleSubmitScore = (value: number) =>
    actor.send({ type: 'SUBMIT_SCORE', value });
  const handleSubmitLevel = (value: LEVELS) =>
    actor.send({ type: 'SUBMIT_LEVEL', value });
  const handleSubmitTime = (value: number) =>
    actor.send({ type: 'SUBMIT_TIME', value });
  const handleBack = () => actor.send({ type: 'BACK' });
  const handleClose = () => router.back();
  const handleSubmitTeams = (value: string[]) => {
    actor.send({ type: 'SUBMIT_TEAMS', value });
    router.push('/crocodile-round');
  };

  let stage: 'overview' | 'score' | 'level' | 'time' | 'teams' = 'overview';

  if (isScoreOpen) {
    stage = 'score';
  } else if (isLevelOpen) {
    stage = 'level';
  } else if (isTimeOpen) {
    stage = 'time';
  } else if (isTeamsOpen) {
    stage = 'teams';
  }

  return (
    <SafeAreaView style={styles.screen}>
      <GameSettingsView
        gameId="crocodile"
        stage={stage}
        score={score}
        level={level}
        time={time}
        teams={teams}
        onOpenScore={handleOpenScore}
        onOpenLevel={handleOpenLevel}
        onOpenTime={handleOpenTime}
        onOpenTeams={handleOpenTeams}
        onSubmitScore={handleSubmitScore}
        onSubmitLevel={handleSubmitLevel}
        onSubmitTime={handleSubmitTime}
        onSubmitTeams={handleSubmitTeams}
        onBack={handleBack}
        onClose={handleClose}
      />
    </SafeAreaView>
  );
}
