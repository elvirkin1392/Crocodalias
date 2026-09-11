import { createActorContext } from '@xstate/react';

import { hatMachine } from '../state/hat';

/** The Hat screen provides a fresh actor, so every game starts clean. */
export const HatContext = createActorContext(hatMachine);
