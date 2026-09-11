import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { RoundContext } from '@/context/round';
import { currentTeamIndex } from '@/state/round';
import { styles } from './PlayPlaceholder.styles';

type PlayPlaceholderProps = {
  onFinish: () => void;
  onClose: () => void;
};

/**
 * Temporary stand-in for the swipe cards, so the whole round loop can be
 * played end to end. Replaced once the cards are ported.
 */
export function PlayPlaceholder({ onFinish, onClose }: PlayPlaceholderProps) {
  const actor = RoundContext.useActorRef();
  const words = RoundContext.useSelector((state) => state.context.words);
  const playing = RoundContext.useSelector((state) =>
    currentTeamIndex(state.context),
  );
  const team = RoundContext.useSelector(
    (state) => state.context.teams[currentTeamIndex(state.context)],
  );
  const [index, setIndex] = useState(0);

  const answer = (points: number) => {
    actor.send({ type: 'ADD_POINTS', teamIndex: playing, points });
    setIndex((current) => current + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.note}>Временный экран — вместо карточек</Text>
      <Text style={styles.team}>
        {team?.name}: {team?.totalScore}
      </Text>

      <View style={styles.card}>
        <Text style={styles.word}>{words[index % words.length]}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.action, styles.skip]}
          onPress={() => answer(-1)}
        >
          <Text style={styles.actionText}>Пропуск −1</Text>
        </Pressable>
        <Pressable
          style={[styles.action, styles.guess]}
          onPress={() => answer(1)}
        >
          <Text style={styles.actionText}>Угадали +1</Text>
        </Pressable>
      </View>

      <FooterControls
        onClose={onClose}
        onSubmit={onFinish}
      />
    </View>
  );
}
