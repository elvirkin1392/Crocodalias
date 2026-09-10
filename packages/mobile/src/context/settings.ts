import { createActorContext } from '@xstate/react';

import { classicSettingsMachine } from '../state/classicSettings';

/**
 * Settings sit above every screen, so they survive navigating between the
 * game list, the settings screens and the round.
 */
export const ClassicSettingsContext = createActorContext(
  classicSettingsMachine,
);
