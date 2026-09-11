import { createActorContext } from '@xstate/react';

import { aliasSettingsMachine } from '../state/aliasSettings';

export const AliasSettingsContext = createActorContext(aliasSettingsMachine);
