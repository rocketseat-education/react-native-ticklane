import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './placeholder-screen.styles';

export function usePlaceholderScreen() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
