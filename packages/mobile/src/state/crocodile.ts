import { assign, setup } from 'xstate';

export type CrocodileWordResult = 'guessed' | 'skipped';

export type ShownWordEntry = { word: string; result: CrocodileWordResult };

export type CrocodileContext = {
  words: string[];
  /** Position in the shuffled deck. */
  wordIndex: number;
  /** Every word acted out so far, in order — the end-of-game list. */
  shownWords: ShownWordEntry[];
};

export type CrocodileEvent =
  | { type: 'UPDATE_WORDS'; value: string[] }
  | { type: 'RESOLVE_WORD'; result: CrocodileWordResult }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'FINISH' };

export function currentWord({ words, wordIndex }: CrocodileContext): string {
  const hasWords = words.length > 0;

  return hasWords ? words[wordIndex % words.length] : '';
}

export function guessedCount({ shownWords }: CrocodileContext): number {
  return shownWords.filter((entry) => entry.result === 'guessed').length;
}

/**
 * Classic Crocodile: no teams, no score and no timer. One player acts the
 * word out, whoever guesses it acts out the next one, until the group stops.
 */
export const crocodileMachine = setup({
  types: {
    context: {} as CrocodileContext,
    events: {} as CrocodileEvent,
  },
}).createMachine({
  id: 'crocodile',
  initial: 'playing',
  context: {
    words: [],
    wordIndex: 0,
    shownWords: [],
  },
  on: {
    UPDATE_WORDS: {
      actions: assign({ words: ({ event }) => event.value, wordIndex: 0 }),
    },
  },
  states: {
    playing: {
      on: {
        RESOLVE_WORD: {
          actions: assign(({ context, event }) => ({
            shownWords: [
              ...context.shownWords,
              { word: currentWord(context), result: event.result },
            ],
            wordIndex: context.wordIndex + 1,
          })),
        },
        PAUSE: { target: 'paused' },
        FINISH: { target: 'finished' },
      },
    },
    paused: {
      on: {
        RESUME: { target: 'playing' },
        FINISH: { target: 'finished' },
      },
    },
    finished: {
      type: 'final',
    },
  },
});
