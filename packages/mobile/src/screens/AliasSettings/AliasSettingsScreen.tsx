import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { FooterControls } from '@/components/FooterControls';
import { LevelButton } from '@/components/settings/LevelButton';
import { LevelSettings } from '@/components/settings/LevelSettings';
import { NumberSettings } from '@/components/settings/NumberSettings';
import { ScoreButton } from '@/components/settings/ScoreButton';
import { TimeButton } from '@/components/settings/TimeButton';
import { AliasSettingsContext } from '@/context/settings';
import { LEVELS } from '@/enums/settings';
import { SCORE_LIMITS, TIME_LIMITS } from '@/state/settings';
import { styles } from './AliasSettingsScreen.styles';

const SCORE_STEP = 5;
const TIME_STEP = 10;

export function AliasSettingsScreen() {
  const { t } = useTranslation();
  const actor = AliasSettingsContext.useActorRef();
  const { score, level, time } = AliasSettingsContext.useSelector(
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
  const handleBack = () => actor.send({ type: 'BACK' });
  const handleClose = () => router.back();
  // TODO: вести на экран команд, когда его перенесём
  const handleStart = () => router.push('/round');

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
        onSubmit={handleStart}
      />
    </View>
  );

  if (isScoreOpen) {
    content = (
      <NumberSettings
        key="score"
        title={t('settings.score')}
        defaultValue={score}
        limits={SCORE_LIMITS}
        step={SCORE_STEP}
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
      <NumberSettings
        key="time"
        title={t('settings.time')}
        defaultValue={time}
        limits={TIME_LIMITS}
        step={TIME_STEP}
        onSubmit={handleSubmitTime}
        onClose={handleBack}
      />
    );
  }

  return <SafeAreaView style={styles.screen}>{content}</SafeAreaView>;
}
