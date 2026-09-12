import { createActorContext } from '@xstate/react';

import { crocodileMachine } from '../state/crocodile';

/** The Crocodile screen provides a fresh actor, so every game starts clean. */
export const CrocodileContext = createActorContext(crocodileMachine);
