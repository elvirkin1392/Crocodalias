import { createActorContext } from '@xstate/react';

import { roundMachine } from '../state/round';

/** The round screen provides a fresh actor, so every game starts clean. */
export const RoundContext = createActorContext(roundMachine);
