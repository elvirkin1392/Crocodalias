import { useMachine } from '@xstate/react';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import closeIcon from '@/assets/icons/close.svg';
import { RoundContext } from '@/context/round';
import { AliasSettingsContext } from '@/context/settings';
import {
  currentTeamIndex,
  currentWord,
  nextTeamIndex,
  stolenPoints,
  turnPoints,
  type WordResult,
} from '@/state/round';
import { timerMachine } from '@/state/timer';
import { QuitGame } from './QuitGame';
import { styles } from './RoundPlay.styles';
import { SwipeCard } from './SwipeCard';
import { Timer } from './Timer';

const SHOW_TIME_MS = 2000;

type RoundPlayProps = {
  onFinish: () => void;
  onQuit: () => void;
};

export function RoundPlay({ onFinish, onQuit }: RoundPlayProps) {
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
  const roundTime = AliasSettingsContext.useSelector(
    (state) => state.context.time,
  );
  const [timer, sendTimer] = useMachine(timerMachine);
  const turnScore = RoundContext.useSelector((state) =>
    turnPoints(state.context),
  );
  const stolenScore = RoundContext.useSelector((state) =>
    stolenPoints(state.context),
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
  const opponentTeam = teams[opponentIndex];
  const opponentStyle = isTimeUp
    ? [styles.opponent, styles.opponentCanSteal]
    : styles.opponent;

  const resolveCard = (result: WordResult) => {
    actor.send({ type: 'RESOLVE_WORD', result });

    if (isTimeUp) {
      setIsShowTime(true);
    }
  };

  const handleGuessed = () => resolveCard('guessed');
  const handleSkipped = () => resolveCard('skipped');
  const handleStolen = () => resolveCard('stolen');

  const handleStartTimer = () => sendTimer({ type: 'START' });
  const handleTimerPress = () =>
    sendTimer({ type: isPaused ? 'START' : 'PAUSE' });

  const handleOpenQuit = () => {
    sendTimer({ type: 'PAUSE' });
    setIsQuitOpen(true);
  };
  const handleCloseQuit = () => setIsQuitOpen(false);
  const handleClosePress = isQuitOpen ? handleCloseQuit : handleOpenQuit;

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
          onFinish={onQuit}
          onContinueLater={handleContinueLater}
        />
      ) : (
        <>
          <Text style={opponentStyle}>
            {opponentTeam?.name} {stolenScore}
          </Text>

          <View style={styles.cardArea}>
            {isShowTime ? (
              <View style={styles.showTime}>
                <Text style={styles.showTimeText}>{t('round.showTime')}</Text>
                <Text style={styles.showTimeText}>🎊 🎉 🐊</Text>
              </View>
            ) : (
              <SwipeCard
                word={word}
                isHidden={isCardHidden}
                canSteal={isTimeUp}
                onPress={handleStartTimer}
                onGuessed={handleGuessed}
                onSkipped={handleSkipped}
                onStolen={handleStolen}
              />
            )}
          </View>

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
