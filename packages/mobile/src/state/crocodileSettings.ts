import { assign, setup } from 'xstate';

import { LEVELS } from '../enums/settings';

/** Classic Crocodile has no teams, score or timer — the level is all there is. */
export const crocodileSettingsMachine = setup({
  types: {
    context: {} as { level: LEVELS },
    events: {} as { type: 'SUBMIT_LEVEL'; value: LEVELS },
  },
}).createMachine({
  id: 'crocodileSettings',
  context: { level: LEVELS.medium },
  on: {
    SUBMIT_LEVEL: {
      actions: assign({ level: ({ event }) => event.value }),
    },
  },
});
