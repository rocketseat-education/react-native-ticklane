import type { ReactNode } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { ThemeProvider, type ThemePreference } from './theme-provider';

type AppThemeProviderProps = {
  children: ReactNode;
  initialPreference?: ThemePreference;
};

export function AppThemeProvider({ children, initialPreference }: AppThemeProviderProps) {
  const systemMode = useColorScheme();

  return (
    <ThemeProvider initialPreference={initialPreference} systemMode={systemMode}>
      {children}
    </ThemeProvider>
  );
}
