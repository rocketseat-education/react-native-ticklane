import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';

import { darkTheme, lightTheme, type Theme, type ThemeMode } from './index';

export type ThemePreference = ThemeMode | 'system';

export type ThemeContextValue = {
  theme: Theme;
  mode: ThemeMode;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggleMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
  initialPreference?: ThemePreference;
  systemMode?: ThemeMode | null;
};

const DEFAULT_PREFERENCE: ThemePreference = 'dark';

function resolveMode(preference: ThemePreference, systemMode: ThemeMode | null): ThemeMode {
  if (preference === 'system') {
    return systemMode ?? 'dark';
  }

  return preference;
}

export function ThemeProvider({
  children,
  initialPreference = DEFAULT_PREFERENCE,
  systemMode = null,
}: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);

  const mode = resolveMode(preference, systemMode);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const toggleMode = useCallback(() => {
    setPreference((current) => {
      const currentMode = resolveMode(current, systemMode);
      return currentMode === 'dark' ? 'light' : 'dark';
    });
  }, [systemMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, mode, preference, setPreference, toggleMode }),
    [theme, mode, preference, toggleMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
