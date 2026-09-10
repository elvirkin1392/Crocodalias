import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FooterControls } from '@/components/FooterControls';
import { RoundContext } from '@/context/round';
import { currentTeamIndex } from '@/state/round';

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

      <FooterControls onClose={onClose} onSubmit={onFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
    backgroundColor: '#eaf7db',
  },
  note: {
    fontSize: 13,
    color: '#8a9a7a',
  },
  team: {
    marginTop: 12,
    fontSize: 20,
  },
  card: {
    marginTop: 32,
    width: 245,
    height: 360,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: '#68877c',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  word: {
    fontSize: 28,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  action: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  skip: {
    backgroundColor: '#f3d4d4',
  },
  guess: {
    backgroundColor: '#cfe8bf',
  },
  actionText: {
    fontSize: 16,
  },
});
