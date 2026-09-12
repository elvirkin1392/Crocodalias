import { useMachine } from '@xstate/react';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import closeIcon from '@/assets/icons/close.svg';
import { QuitGame } from '@/components/round/QuitGame';
import { SwipeCard } from '@/components/round/SwipeCard';
import { Timer } from '@/components/round/Timer';
import { HatContext } from '@/context/hat';
import { currentTeamIndex, currentWord, turnPoints } from '@/state/hat';
import { timerMachine } from '@/state/timer';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { createStyles } from './HatPlay.styles';

const SHOW_TIME_MS = 2000;

type HatPlayProps = {
  roundTime: number;
  onFinish: () => void;
  onFinishGame: () => void;
  onQuit: () => void;
};

export function HatPlay({
  roundTime,
  onFinish,
  onFinishGame,
  onQuit,
}: HatPlayProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const actor = HatContext.useActorRef();
  const teams = HatContext.useSelector((state) => state.context.teams);
  const word = HatContext.useSelector((state) => currentWord(state.context));
  const playingIndex = HatContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );
  const [timer, sendTimer] = useMachine(timerMachine);
  const turnScore = HatContext.useSelector((state) =>
    turnPoints(state.context),
  );
  const [isQuitOpen, setIsQuitOpen] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);

  useEffect(() => {
    sendTimer({ type: 'DURATION.UPDATE', value: roundTime });
  }, [sendTimer, roundTime]);

  useEffect(() => {
    if (!isShowTime) {
      return;
    }

    const timeout = setTimeout(onFinish, SHOW_TIME_MS);

    return () => clearTimeout(timeout);
  }, [isShowTime, onFinish]);

  const { elapsed, duration, isPaused } = timer.context;
  const isTimeUp = elapsed > duration;
  const isCardHidden = isPaused && !isTimeUp;
  const secondsLeft = Math.max(0, Math.ceil(duration - elapsed));
  const playingTeam = teams[playingIndex];

  // A guessed stage's last word makes the machine refill the queue right
  // away, so "was this the last word" has to be checked before sending —
  // reading the queue afterwards would already show the next stage's words.
  const finishIfTurnOver = (wasLastInStage: boolean) => {
    if (isTimeUp || wasLastInStage) {
      setIsShowTime(true);
    }
  };

  const handleGuessed = () => {
    const wasLastInStage = actor.getSnapshot().context.queue.length === 1;

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    finishIfTurnOver(wasLastInStage);
  };

  const handleSkipped = () => {
    actor.send({ type: 'RESOLVE_WORD', result: 'skipped' });
    finishIfTurnOver(false);
  };

  // The Hat has no steal — swiping up never activates.
  const handleStolen = () => {};

  const handleStartTimer = () => sendTimer({ type: 'START' });
  const handleTimerPress = () =>
    sendTimer({ type: isPaused ? 'START' : 'PAUSE' });

  const handleOpenQuit = () => {
    sendTimer({ type: 'PAUSE' });
    setIsQuitOpen(true);
  };
  const handleCloseQuit = () => setIsQuitOpen(false);
  const handleClosePress = isQuitOpen ? handleCloseQuit : handleOpenQuit;

  let cardContent = (
    <SwipeCard
      word={word}
      isHidden={isCardHidden}
      canSteal={false}
      onPress={handleStartTimer}
      onGuessed={handleGuessed}
      onSkipped={handleSkipped}
      onStolen={handleStolen}
    />
  );

  if (isShowTime) {
    cardContent = (
      <View style={styles.showTime}>
        <Text style={styles.showTimeText}>{t('round.showTime')}</Text>
        <Text style={styles.showTimeText}>🎊 🎉 🎩</Text>
      </View>
    );
  }

  // TODO: сохранять партию, чтобы «Продолжить позже» возвращал в неё
  const handleContinueLater = onQuit;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          hitSlop={16}
          onPress={handleClosePress}
        >
          <Image
            source={closeIcon}
            style={styles.closeIcon}
            contentFit="contain"
          />
        </Pressable>
      </View>

      {isQuitOpen ? (
        <QuitGame
          onFinish={onFinishGame}
          onContinueLater={handleContinueLater}
        />
      ) : (
        <>
          <View style={styles.cardArea}>{cardContent}</View>

          <View style={styles.footer}>
            <Text style={styles.team}>
              {playingTeam?.name} {turnScore}
            </Text>
            <View style={styles.timer}>
              <Timer
                secondsLeft={secondsLeft}
                isDisabled={isTimeUp}
                onPress={handleTimerPress}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}
