import { Stack } from 'expo-router';

import { ClassicSettingsContext } from '@/context/settings';

export default function RootLayout() {
  return (
    <ClassicSettingsContext.Provider>
      <Stack screenOptions={{ headerShown: false }} />
    </ClassicSettingsContext.Provider>
  );
}
