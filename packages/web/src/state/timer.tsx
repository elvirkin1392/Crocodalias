import { createMachine, assign } from "xstate";

interface TimerContext {
  elapsed: number;
  duration: number;
  interval: number;
  isPaused: boolean;
}

type TimerEvent =
  | {
      type: "TICK";
    }
  | {
      type: "DURATION.UPDATE";
      value: number;
    }
  | {
      type: "RESET";
    }
  | {
      type: "PAUSE";
    }
  | {
      type: "START";
    };

export const timerMachine = createMachine<TimerContext, TimerEvent>({
  initial: "paused",
  context: {
    elapsed: 0,
    duration: 60,
    interval: 0.1,
    isPaused: true,
  },
  states: {
    running: {
      invoke: {
        src: (context) => (cb) => {
          const interval = setInterval(() => {
            cb("TICK");
          }, 1000 * context.interval);

          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        PAUSE: {
          target: "paused",
          actions: assign({
            isPaused: () => true,
          }),
        },
        TICK: {
          actions: assign({
            elapsed: (context) =>
              +(context.elapsed + context.interval).toFixed(2),
          }),
        },
      },
    },
    paused: {
      on: {
        START: {
          target: "running",
          actions: assign({
            isPaused: () => false,
          }),
          // cond: (context) => context.elapsed < context.duration,
        },
      },
    },
  },
  on: {
    "DURATION.UPDATE": {
      actions: assign({
        duration: (_, event) => event.value,
      }),
    },
    RESET: {
      actions: assign({
        elapsed: 0,
      }),
    },
  },
});
