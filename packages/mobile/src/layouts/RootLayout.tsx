import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  AliasSettingsContext,
  CrocodileSettingsContext,
} from '@/context/settings';
import { UserContext } from '@/context/user';
import { styles } from './RootLayout.styles';

SplashScreen.preventAutoHideAsync();

export function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <UserContext.Provider>
        <AliasSettingsContext.Provider>
          <CrocodileSettingsContext.Provider>
            <AppNavigator />
          </CrocodileSettingsContext.Provider>
        </AliasSettingsContext.Provider>
      </UserContext.Provider>
    </GestureHandlerRootView>
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
