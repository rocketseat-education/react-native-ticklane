import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/modules/auth/context';
import { AuthGateProvider } from '@/modules/auth/gate';
import { LibraryProvider } from '@/state/library';
import { AppThemeProvider } from '@/theme/app-theme-provider';
import { useNavigationTheme } from '@/theme/use-navigation-theme';
import { useTheme } from '@/theme/use-theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootStack() {
  const navigationTheme = useNavigationTheme();
  const { mode } = useTheme();

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: navigationTheme.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="checklist/[id]/index" />
        <Stack.Screen name="checklist/[id]/edit" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checklist/[id]/item/[itemId]" />
        <Stack.Screen name="execution/[id]" />
        <Stack.Screen name="executions/running" />
        <Stack.Screen name="author/[id]" />
        <Stack.Screen name="create" options={{ presentation: 'modal' }} />
        <Stack.Screen name="auth" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile/edit" options={{ presentation: 'modal' }} />
        <Stack.Screen name="profile/my-checklists" />
        <Stack.Screen name="profile/my-favorites" />
      </Stack>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <AuthProvider>
            <LibraryProvider>
              <AuthGateProvider>
                <RootStack />
              </AuthGateProvider>
            </LibraryProvider>
          </AuthProvider>
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
