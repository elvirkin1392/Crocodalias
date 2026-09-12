import { Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SwipeCard } from '@/components/round/SwipeCard';
import { CrocodileContext } from '@/context/crocodile';
import { currentWord } from '@/state/crocodile';
import { useThemedStyles } from '@/theme/useThemedStyles';
import { CrocodilePause } from './CrocodilePause';
import { createStyles } from './CrocodilePlay.styles';

export function CrocodilePlay() {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const actor = CrocodileContext.useActorRef();
  const word = CrocodileContext.useSelector((state) =>
    currentWord(state.context),
  );
  const isPaused = CrocodileContext.useSelector((state) =>
    state.matches('paused'),
  );

  const handleGuessed = () =>
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
  const handleSkipped = () =>
    actor.send({ type: 'RESOLVE_WORD', result: 'skipped' });
  const handlePause = () => actor.send({ type: 'PAUSE' });
  const handleResume = () => actor.send({ type: 'RESUME' });
  const handleFinish = () => actor.send({ type: 'FINISH' });
  const handlePausePress = isPaused ? handleResume : handlePause;

  // No timer to start and no steal: the card's play button and swipe up
  // never fire in Crocodile.
  const handleUnused = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.pauseIcon}
          accessibilityRole="button"
          accessibilityLabel={t('crocodile.pause')}
          hitSlop={16}
          onPress={handlePausePress}
        >
          <View style={styles.pauseBar} />
          <View style={styles.pauseBar} />
        </Pressable>
      </View>

      {isPaused ? (
        <CrocodilePause
          onResume={handleResume}
          onFinish={handleFinish}
        />
      ) : (
        <>
          <Text style={styles.hint}>{t('crocodile.ruleHint')}</Text>
          <View style={styles.cardArea}>
            <SwipeCard
              word={word}
              isHidden={false}
              canSteal={false}
              onPress={handleUnused}
              onGuessed={handleGuessed}
              onSkipped={handleSkipped}
              onStolen={handleUnused}
            />
          </View>
          <View style={styles.footer}>
            <Text style={styles.hint}>{t('crocodile.passHint')}</Text>
          </View>
        </>
      )}
    </View>
  );
}
