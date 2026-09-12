import { createActor } from 'xstate';

import {
  currentTeamIndex,
  currentWord,
  hatMachine,
  isGameComplete,
  isStageComplete,
  turnPoints,
} from './hat';

jest.mock('../dictionaries', () => ({
  shuffle: <T>(items: T[]) => [...items],
}));

function startGame() {
  const actor = createActor(hatMachine).start();

  actor.send({
    type: 'SET_TEAMS',
    value: [
      { name: 'A', totalScore: 0 },
      { name: 'B', totalScore: 0 },
    ],
  });
  actor.send({ type: 'UPDATE_WORDS', value: ['fox', 'owl', 'cat'] });

  return actor;
}

describe('hatMachine', () => {
  it('starts on stage 1 with the full pool queued', () => {
    const context = startGame().getSnapshot().context;

    expect(context.stage).toBe(1);
    expect(context.queue).toEqual(['fox', 'owl', 'cat']);
  });

  it('removes a guessed word from the queue and awards a point', () => {
    const actor = startGame();

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    const context = actor.getSnapshot().context;
    expect(context.queue).toEqual(['owl', 'cat']);
    expect(context.teams[0].totalScore).toBe(1);
    expect(turnPoints(context)).toBe(1);
  });

  it('sends a skipped word to the back of the queue without a penalty', () => {
    const actor = startGame();

    actor.send({ type: 'RESOLVE_WORD', result: 'skipped' });

    const context = actor.getSnapshot().context;
    expect(context.queue).toEqual(['owl', 'cat', 'fox']);
    expect(context.teams[0].totalScore).toBe(0);
    expect(currentWord(context)).toBe('owl');
  });

  it('advances to the next stage once the queue empties, refilling it', () => {
    const actor = startGame();

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    expect(isStageComplete(actor.getSnapshot().context)).toBe(false);

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    const context = actor.getSnapshot().context;
    expect(context.stage).toBe(2);
    expect(context.queue).toEqual(['fox', 'owl', 'cat']);
    expect(isGameComplete(context)).toBe(false);
  });

  it('finishes the game once stage 3 is emptied, without refilling it', () => {
    const actor = startGame();
    const guessAll = () => {
      actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
      actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
      actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    };

    guessAll();
    guessAll();
    guessAll();

    const context = actor.getSnapshot().context;
    expect(context.stage).toBe(3);
    expect(context.queue).toEqual([]);
    expect(isGameComplete(context)).toBe(true);
    expect(context.teams[0].totalScore + context.teams[1].totalScore).toBe(9);
  });

  it('rotates the turn between teams and clears the turn log', () => {
    const actor = startGame();
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    actor.send({ type: 'NEXT_TURN' });

    const context = actor.getSnapshot().context;
    expect(currentTeamIndex(context)).toBe(1);
    expect(context.turnLog).toHaveLength(0);
  });
});
