import AsyncStorage from '@react-native-async-storage/async-storage';

import { isLang } from '../i18n/languages';
import type { User } from '../state/user';

const USER_KEY = 'user';

export async function readStoredUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);

  if (raw === null) {
    return null;
  }

  const stored: unknown = JSON.parse(raw);
  const isObject = typeof stored === 'object' && stored !== null;
  const hasValidLang = isObject && isLang((stored as User).lang);

  return hasValidLang ? (stored as User) : null;
}

export async function writeStoredUser(user: User): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}
