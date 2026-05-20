import { useColorScheme as useRNColorScheme } from 'react-native';

import type { ThemeMode } from '@/theme';

export function useColorScheme(): ThemeMode | null {
  const scheme = useRNColorScheme();

  if (scheme === 'dark' || scheme === 'light') {
    return scheme;
  }

  return null;
}
