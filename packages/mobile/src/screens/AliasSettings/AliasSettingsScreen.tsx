import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { LevelButton } from '@/components/settings/LevelButton';
import { LevelSettings } from '@/components/settings/LevelSettings';
import { ScoreButton } from '@/components/settings/ScoreButton';
import { ScoreSettings } from '@/components/settings/ScoreSettings';
import { TeamsSettings } from '@/components/settings/TeamsSettings';
import { TimeButton } from '@/components/settings/TimeButton';
import { TimeSettings } from '@/components/settings/TimeSettings';
import { AliasSettingsContext } from '@/context/settings';
import { LEVELS } from '@/enums/settings';
import { styles } from './AliasSettingsScreen.styles';

export function AliasSettingsScreen() {
  const { t } = useTranslation();
  const actor = AliasSettingsContext.useActorRef();
  const { score, level, time, teams } = AliasSettingsContext.useSelector(
    (state) => state.context,
  );
  const isScoreOpen = AliasSettingsContext.useSelector((state) =>
    state.matches('scoreSettings'),
  );
  const isLevelOpen = AliasSettingsContext.useSelector((state) =>
    state.matches('levelSettings'),
  );
  const isTimeOpen = AliasSettingsContext.useSelector((state) =>
    state.matches('timeSettings'),
  );
  const isTeamsOpen = AliasSettingsContext.useSelector((state) =>
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
  const handleSubmitScore = (value: number) =>
    actor.send({ type: 'SUBMIT_SCORE', value });
  const handleSubmitLevel = (value: LEVELS) =>
    actor.send({ type: 'SUBMIT_LEVEL', value });
  const handleSubmitTime = (value: number) =>
    actor.send({ type: 'SUBMIT_TIME', value });
  const handleOpenTeams = () => actor.send({ type: 'OPEN_TEAM_SETTINGS' });
  const handleBack = () => actor.send({ type: 'BACK' });
  const handleClose = () => router.back();
  const handleSubmitTeams = (value: string[]) => {
    actor.send({ type: 'SUBMIT_TEAMS', value });
    router.push('/round');
  };

  let content = (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('settings.title', { game: t('games.alias') })}
      </Text>
      <View style={styles.values}>
        <ScoreButton
          value={score}
          onPress={handleOpenScore}
        />
        <LevelButton
          value={level}
          onPress={handleOpenLevel}
        />
        <TimeButton
          value={time}
          onPress={handleOpenTime}
        />
      </View>
      <FooterControls
        onClose={handleClose}
        onSubmit={handleOpenTeams}
      />
    </View>
  );

  if (isScoreOpen) {
    content = (
      <ScoreSettings
        title={t('settings.score')}
        defaultValue={score}
        onSubmit={handleSubmitScore}
        onClose={handleBack}
      />
    );
  }

  if (isLevelOpen) {
    content = (
      <LevelSettings
        title={t('settings.level')}
        defaultValue={level}
        onSubmit={handleSubmitLevel}
        onClose={handleBack}
      />
    );
  }

  if (isTimeOpen) {
    content = (
      <TimeSettings
        title={t('settings.time')}
        defaultValue={time}
        onSubmit={handleSubmitTime}
        onClose={handleBack}
      />
    );
  }

  if (isTeamsOpen) {
    content = (
      <TeamsSettings
        title={t('settings.teams')}
        defaultValue={teams}
        onSubmit={handleSubmitTeams}
        onClose={handleBack}
      />
    );
  }

  return <SafeAreaView style={styles.screen}>{content}</SafeAreaView>;
}
