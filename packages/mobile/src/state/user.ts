import { assign, fromPromise, setup } from 'xstate';

import { FALLBACK_LANG, type Lang } from '../i18n/languages';

export type User = {
  lang: Lang;
};

export type UserEvent = { type: 'SET_LANG'; lang: Lang };

export const userMachine = setup({
  types: {
    context: {} as User,
    events: {} as UserEvent,
  },
  actors: {
    loadUser: fromPromise<User>(async () => ({ lang: FALLBACK_LANG })),
  },
  actions: {
    saveUser: () => {},
    applyLanguage: () => {},
  },
}).createMachine({
  id: 'user',
  initial: 'loading',
  context: {
    lang: FALLBACK_LANG,
  },
  states: {
    loading: {
      invoke: {
        src: 'loadUser',
        onDone: {
          target: 'ready',
          actions: [assign(({ event }) => event.output), 'applyLanguage'],
        },
        onError: {
          target: 'ready',
          actions: 'applyLanguage',
        },
      },
    },
    ready: {
      on: {
        SET_LANG: {
          actions: [
            assign({ lang: ({ event }) => event.lang }),
            'saveUser',
            'applyLanguage',
          ],
        },
      },
    },
  },
});
