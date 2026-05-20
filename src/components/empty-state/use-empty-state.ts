import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './empty-state.styles';

export function useEmptyState() {
  const { theme } = useTheme();

  return useMemo(() => createStyles(theme), [theme]);
}
