import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { ClassicSettingsContext } from '@/context/settings';
import { UserContext } from '@/context/user';

SplashScreen.preventAutoHideAsync();

export function RootLayout() {
  return (
    <UserContext.Provider>
      <ClassicSettingsContext.Provider>
        <AppNavigator />
      </ClassicSettingsContext.Provider>
    </UserContext.Provider>
  );
}

function AppNavigator() {
  const isUserReady = UserContext.useSelector((state) =>
    state.matches('ready'),
  );

  useEffect(() => {
    if (isUserReady) {
      SplashScreen.hideAsync();
    }
  }, [isUserReady]);

  if (!isUserReady) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
