import { assign, fromCallback, setup } from 'xstate';

export type TimerContext = {
  elapsed: number;
  duration: number;
  interval: number;
  isPaused: boolean;
};

export type TimerEvent =
  | { type: 'TICK' }
  | { type: 'DURATION.UPDATE'; value: number }
  | { type: 'RESET' }
  | { type: 'PAUSE' }
  | { type: 'START' };

/** Sends TICK every `interval` seconds while the timer is running. */
const ticker = fromCallback<TimerEvent, { interval: number }>(
  ({ sendBack, input }) => {
    const id = setInterval(() => {
      sendBack({ type: 'TICK' });
    }, 1000 * input.interval);

    return () => {
      clearInterval(id);
    };
  },
);

export const timerMachine = setup({
  types: {
    context: {} as TimerContext,
    events: {} as TimerEvent,
  },
  actors: { ticker },
}).createMachine({
  id: 'timer',
  initial: 'paused',
  context: {
    elapsed: 0,
    duration: 3,
    interval: 0.1,
    isPaused: true,
  },
  states: {
    running: {
      invoke: {
        src: 'ticker',
        input: ({ context }) => ({ interval: context.interval }),
      },
      always: {
        target: 'paused',
        guard: ({ context }) => context.elapsed > context.duration,
        actions: assign({ isPaused: true }),
      },
      on: {
        PAUSE: {
          target: 'paused',
          actions: assign({ isPaused: true }),
        },
        TICK: {
          actions: assign({
            elapsed: ({ context }) =>
              +(context.elapsed + context.interval).toFixed(2),
          }),
        },
      },
    },
    paused: {
      on: {
        START: {
          target: 'running',
          actions: assign({ isPaused: false }),
        },
      },
    },
  },
  on: {
    'DURATION.UPDATE': {
      actions: assign({ duration: ({ event }) => event.value }),
    },
    RESET: {
      actions: assign({ elapsed: 0 }),
    },
  },
});
