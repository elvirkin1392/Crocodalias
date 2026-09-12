import { createActor } from 'xstate';

import { timerMachine } from './timer';

describe('timerMachine', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts paused and does nothing until started', () => {
    const actor = createActor(timerMachine).start();

    expect(actor.getSnapshot().value).toBe('paused');
    expect(actor.getSnapshot().context.isPaused).toBe(true);
  });

  it('accumulates elapsed time while running', () => {
    const actor = createActor(timerMachine).start();
    actor.send({ type: 'DURATION.UPDATE', value: 3 });

    actor.send({ type: 'START' });
    jest.advanceTimersByTime(100);

    const context = actor.getSnapshot().context;
    expect(context.isPaused).toBe(false);
    expect(context.elapsed).toBeCloseTo(0.1);
  });

  it('pauses on its own once elapsed passes the duration', () => {
    const actor = createActor(timerMachine).start();
    actor.send({ type: 'DURATION.UPDATE', value: 0.2 });

    actor.send({ type: 'START' });
    jest.advanceTimersByTime(400);

    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe('paused');
    expect(snapshot.context.isPaused).toBe(true);
  });

  it('pauses on request without losing the elapsed time', () => {
    const actor = createActor(timerMachine).start();
    actor.send({ type: 'START' });
    jest.advanceTimersByTime(100);

    actor.send({ type: 'PAUSE' });
    const elapsedAtPause = actor.getSnapshot().context.elapsed;
    jest.advanceTimersByTime(200);

    const context = actor.getSnapshot().context;
    expect(context.isPaused).toBe(true);
    expect(context.elapsed).toBe(elapsedAtPause);
  });

  it('resets the elapsed time without affecting the duration', () => {
    const actor = createActor(timerMachine).start();
    actor.send({ type: 'START' });
    jest.advanceTimersByTime(100);

    actor.send({ type: 'RESET' });

    const context = actor.getSnapshot().context;
    expect(context.elapsed).toBe(0);
    expect(context.duration).toBe(3);
  });
});
