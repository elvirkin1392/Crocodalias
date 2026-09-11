import { createActorContext } from '@xstate/react';
import { fromPromise } from 'xstate';

import { i18n } from '../i18n';
import { detectDeviceLang } from '../i18n/deviceLanguage';
import { userMachine, type User } from '../state/user';
import { readStoredUser, writeStoredUser } from '../storage/user';

// A saved choice wins; otherwise follow the device. The detected language is
// not saved, so changing the phone's language later still takes effect.
async function loadUser(): Promise<User> {
  const stored = await readStoredUser().catch(() => null);

  return stored ?? { lang: detectDeviceLang() };
}

export const UserContext = createActorContext(
  userMachine.provide({
    actors: {
      loadUser: fromPromise(loadUser),
    },
    actions: {
      saveUser: ({ context }) => {
        writeStoredUser(context).catch(() => {});
      },
      applyLanguage: ({ context }) => {
        i18n.changeLanguage(context.lang);
      },
    },
  }),
);
