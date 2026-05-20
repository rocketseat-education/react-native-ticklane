import { useMemo } from 'react';
import { DarkTheme, DefaultTheme, type Theme as NavigationTheme } from '@react-navigation/native';

import { useTheme } from './use-theme';

export function useNavigationTheme(): NavigationTheme {
  const { mode, theme } = useTheme();

  return useMemo(() => {
    const base = mode === 'dark' ? DarkTheme : DefaultTheme;

    return {
      ...base,
      colors: {
        ...base.colors,
        background: theme.colors.bg,
        card: theme.colors.surface,
        primary: theme.colors.primary,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.danger,
      },
    };
  }, [mode, theme]);
}
