import { useMachine } from '@xstate/react';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import closeIcon from '@/assets/icons/close.svg';
import { RoundContext } from '@/context/round';
import {
  currentTeamIndex,
  currentWord,
  nextTeamIndex,
  stolenPoints,
  turnPoints,
} from '@/state/round';
import { timerMachine } from '@/state/timer';
import { LastWordPicker } from './LastWordPicker';
import { QuitGame } from './QuitGame';
import { styles } from './RoundPlay.styles';
import { SwipeCard } from './SwipeCard';
import { Timer } from './Timer';

const SHOW_TIME_MS = 2000;

type RoundPlayProps = {
  roundTime: number;
  allowSteal: boolean;
  onFinish: () => void;
  onFinishGame: () => void;
  onQuit: () => void;
};

export function RoundPlay({
  roundTime,
  allowSteal,
  onFinish,
  onFinishGame,
  onQuit,
}: RoundPlayProps) {
  const { t } = useTranslation();
  const actor = RoundContext.useActorRef();
  const teams = RoundContext.useSelector((state) => state.context.teams);
  const word = RoundContext.useSelector((state) => currentWord(state.context));
  const playingIndex = RoundContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );
  const opponentIndex = RoundContext.useSelector((state) =>
    nextTeamIndex(state.context),
  );
  const [timer, sendTimer] = useMachine(timerMachine);
  const turnScore = RoundContext.useSelector((state) =>
    turnPoints(state.context),
  );
  const stolenScore = RoundContext.useSelector((state) =>
    stolenPoints(state.context, nextTeamIndex(state.context)),
  );
  const [isQuitOpen, setIsQuitOpen] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
  const [isPickingTeam, setIsPickingTeam] = useState(false);

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
  const canSteal = isTimeUp && allowSteal;
  const isCardHidden = isPaused && !isTimeUp;
  const secondsLeft = Math.max(0, Math.ceil(duration - elapsed));
  const playingTeam = teams[playingIndex];
  const opponentTeam = teams[opponentIndex];
  const opponentStyle = canSteal
    ? [styles.opponent, styles.opponentCanSteal]
    : styles.opponent;

  const otherTeamIndexes = teams
    .map((_, index) => index)
    .filter((index) => index !== playingIndex);
  const hasSingleOpponent = otherTeamIndexes.length === 1;
  const pickerTeams = otherTeamIndexes.map((index) => ({
    index,
    name: teams[index].name,
  }));

  const finishIfTimeUp = () => {
    if (isTimeUp) {
      setIsShowTime(true);
    }
  };

  const handleGuessed = () => {
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    finishIfTimeUp();
  };

  const handleSkipped = () => {
    actor.send({ type: 'RESOLVE_WORD', result: 'skipped' });
    finishIfTimeUp();
  };

  const resolveStolen = (teamIndex: number) => {
    setIsPickingTeam(false);
    actor.send({ type: 'RESOLVE_WORD', result: 'stolen', teamIndex });
    finishIfTimeUp();
  };

  const handleStolen = () => {
    if (hasSingleOpponent) {
      resolveStolen(otherTeamIndexes[0]);
      return;
    }

    setIsPickingTeam(true);
  };

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
      canSteal={canSteal}
      onPress={handleStartTimer}
      onGuessed={handleGuessed}
      onSkipped={handleSkipped}
      onStolen={handleStolen}
    />
  );

  if (isPickingTeam) {
    cardContent = (
      <LastWordPicker
        word={word}
        teams={pickerTeams}
        onPick={resolveStolen}
      />
    );
  }

  if (isShowTime) {
    cardContent = (
      <View style={styles.showTime}>
        <Text style={styles.showTimeText}>{t('round.showTime')}</Text>
        <Text style={styles.showTimeText}>🎊 🎉 🐊</Text>
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
          {allowSteal && (
            <Text style={opponentStyle}>
              {opponentTeam?.name} {stolenScore}
            </Text>
          )}

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
