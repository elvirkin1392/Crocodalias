import { createActor } from 'xstate';

import { crocodileMachine, currentWord, guessedCount } from './crocodile';

function startGame() {
  const actor = createActor(crocodileMachine).start();

  actor.send({ type: 'UPDATE_WORDS', value: ['fox', 'owl', 'cat'] });

  return actor;
}

describe('crocodileMachine', () => {
  it('starts playing on the first word with nothing shown yet', () => {
    const snapshot = startGame().getSnapshot();

    expect(snapshot.value).toBe('playing');
    expect(currentWord(snapshot.context)).toBe('fox');
    expect(snapshot.context.shownWords).toEqual([]);
  });

  it('logs a guessed word and moves to the next one', () => {
    const actor = startGame();

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    const context = actor.getSnapshot().context;
    expect(context.shownWords).toEqual([{ word: 'fox', result: 'guessed' }]);
    expect(currentWord(context)).toBe('owl');
    expect(guessedCount(context)).toBe(1);
  });

  it('logs a skipped word without counting it as guessed', () => {
    const actor = startGame();

    actor.send({ type: 'RESOLVE_WORD', result: 'skipped' });

    const context = actor.getSnapshot().context;
    expect(context.shownWords).toEqual([{ word: 'fox', result: 'skipped' }]);
    expect(currentWord(context)).toBe('owl');
    expect(guessedCount(context)).toBe(0);
  });

  it('ignores word results while paused and picks up where it left off', () => {
    const actor = startGame();

    actor.send({ type: 'PAUSE' });
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    expect(actor.getSnapshot().value).toBe('paused');
    expect(actor.getSnapshot().context.shownWords).toEqual([]);

    actor.send({ type: 'RESUME' });
    expect(actor.getSnapshot().value).toBe('playing');
    expect(currentWord(actor.getSnapshot().context)).toBe('fox');
  });

  it('finishes from play or from pause, keeping every shown word', () => {
    const fromPlay = startGame();
    fromPlay.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    fromPlay.send({ type: 'FINISH' });

    const fromPause = startGame();
    fromPause.send({ type: 'RESOLVE_WORD', result: 'skipped' });
    fromPause.send({ type: 'PAUSE' });
    fromPause.send({ type: 'FINISH' });

    expect(fromPlay.getSnapshot().value).toBe('finished');
    expect(fromPlay.getSnapshot().context.shownWords).toHaveLength(1);
    expect(fromPause.getSnapshot().value).toBe('finished');
    expect(fromPause.getSnapshot().context.shownWords).toHaveLength(1);
  });

  it('loops the deck once every word has been shown', () => {
    const actor = startGame();

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    expect(currentWord(actor.getSnapshot().context)).toBe('fox');
  });
});
