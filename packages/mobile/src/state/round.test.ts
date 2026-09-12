import { createActor } from 'xstate';

import {
  currentTeamIndex,
  currentWord,
  hasWinningTeam,
  nextTeamIndex,
  roundMachine,
  stolenPoints,
  turnPoints,
} from './round';

function startRound() {
  const actor = createActor(roundMachine).start();

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

describe('roundMachine', () => {
  it('advances the word index and awards a point on a guess', () => {
    const actor = startRound();

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    const context = actor.getSnapshot().context;
    expect(context.teams[0].totalScore).toBe(1);
    expect(currentWord(context)).toBe('owl');
    expect(turnPoints(context)).toBe(1);
  });

  it('deducts a point on a skip but still advances the word', () => {
    const actor = startRound();

    actor.send({ type: 'RESOLVE_WORD', result: 'skipped' });

    const context = actor.getSnapshot().context;
    expect(context.teams[0].totalScore).toBe(-1);
    expect(currentWord(context)).toBe('owl');
  });

  it('credits a stolen word to the stealing team, not the current one', () => {
    const actor = startRound();

    actor.send({ type: 'RESOLVE_WORD', result: 'stolen', teamIndex: 1 });

    const context = actor.getSnapshot().context;
    expect(context.teams[0].totalScore).toBe(0);
    expect(context.teams[1].totalScore).toBe(1);
    expect(stolenPoints(context, 1)).toBe(1);
    expect(turnPoints(context)).toBe(0);
  });

  it('loops the word deck once every word has been used', () => {
    const actor = startRound();

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    expect(currentWord(actor.getSnapshot().context)).toBe('fox');
  });

  it('rotates the turn between teams and clears the turn log', () => {
    const actor = startRound();
    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    actor.send({ type: 'NEXT_TURN' });

    const context = actor.getSnapshot().context;
    expect(currentTeamIndex(context)).toBe(1);
    expect(nextTeamIndex(context)).toBe(0);
    expect(context.turnLog).toHaveLength(0);
    expect(context.round).toBe(1);
  });

  it('starts a new round only once every team has played', () => {
    const actor = startRound();

    actor.send({ type: 'NEXT_TURN' });
    expect(actor.getSnapshot().context.round).toBe(1);

    actor.send({ type: 'NEXT_TURN' });
    expect(actor.getSnapshot().context.round).toBe(2);
  });

  it('reports a winning team once its score reaches the limit', () => {
    const actor = startRound();

    expect(hasWinningTeam(actor.getSnapshot().context, 1)).toBe(false);

    actor.send({ type: 'RESOLVE_WORD', result: 'guessed' });

    expect(hasWinningTeam(actor.getSnapshot().context, 1)).toBe(true);
  });
});
