import { createActorContext } from '@xstate/react';

import { aliasSettingsMachine } from '../state/aliasSettings';
import { crocodileSettingsMachine } from '../state/crocodileSettings';
import { hatSettingsMachine } from '../state/hatSettings';

export const AliasSettingsContext = createActorContext(aliasSettingsMachine);
export const CrocodileSettingsContext = createActorContext(
  crocodileSettingsMachine,
);
export const HatSettingsContext = createActorContext(hatSettingsMachine);
