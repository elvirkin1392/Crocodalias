import { createActorContext } from '@xstate/react';

import { aliasSettingsMachine } from '../state/aliasSettings';
import { crocodileSettingsMachine } from '../state/crocodileSettings';

export const AliasSettingsContext = createActorContext(aliasSettingsMachine);
export const CrocodileSettingsContext = createActorContext(
  crocodileSettingsMachine,
);
