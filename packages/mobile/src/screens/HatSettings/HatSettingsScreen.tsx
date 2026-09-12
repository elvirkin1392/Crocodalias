import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { LevelButton } from '@/components/settings/LevelButton';
import { LevelSettings } from '@/components/settings/LevelSettings';
import { TeamsSettings } from '@/components/settings/TeamsSettings';
import { TimeButton } from '@/components/settings/TimeButton';
import { TimeSettings } from '@/components/settings/TimeSettings';
import { WordCountButton } from '@/components/settings/WordCountButton';
import { WordCountSettings } from '@/components/settings/WordCountSettings';
import { HatSettingsContext } from '@/context/settings';
import { LEVELS } from '@/enums/settings';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HatSettingsScreen.styles';

export function HatSettingsScreen() {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const actor = HatSettingsContext.useActorRef();
  const { score, level, time, teams } = HatSettingsContext.useSelector(
    (state) => state.context,
  );
  const isWordCountOpen = HatSettingsContext.useSelector((state) =>
    state.matches('scoreSettings'),
  );
  const isLevelOpen = HatSettingsContext.useSelector((state) =>
    state.matches('levelSettings'),
  );
  const isTimeOpen = HatSettingsContext.useSelector((state) =>
    state.matches('timeSettings'),
  );
  const isTeamsOpen = HatSettingsContext.useSelector((state) =>
    state.matches('teamSettings'),
  );

  // The settings machine outlives this screen: start from the overview
  // even if the last visit was left from inside an editor.
  useEffect(() => {
    actor.send({ type: 'BACK' });
  }, [actor]);

  const handleOpenWordCount = () => actor.send({ type: 'OPEN_SCORE_SETTINGS' });
  const handleOpenLevel = () => actor.send({ type: 'OPEN_LEVEL_SETTINGS' });
  const handleOpenTime = () => actor.send({ type: 'OPEN_TIME_SETTINGS' });
  const handleOpenTeams = () => actor.send({ type: 'OPEN_TEAM_SETTINGS' });
  const handleSubmitWordCount = (value: number) =>
    actor.send({ type: 'SUBMIT_SCORE', value });
  const handleSubmitLevel = (value: LEVELS) =>
    actor.send({ type: 'SUBMIT_LEVEL', value });
  const handleSubmitTime = (value: number) =>
    actor.send({ type: 'SUBMIT_TIME', value });
  const handleBack = () => actor.send({ type: 'BACK' });
  const handleClose = () => router.back();
  const handleSubmitTeams = (value: string[]) => {
    actor.send({ type: 'SUBMIT_TEAMS', value });
    router.push('/hat-round');
  };

  let content = (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('settings.title', { game: t('games.hat') })}
      </Text>
      <View style={styles.values}>
        <WordCountButton
          value={score}
          onPress={handleOpenWordCount}
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

  if (isWordCountOpen) {
    content = (
      <WordCountSettings
        title={t('settings.wordCount')}
        defaultValue={score}
        onSubmit={handleSubmitWordCount}
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
