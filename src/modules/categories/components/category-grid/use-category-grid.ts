import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './category-grid.styles';

export function useCategoryGrid() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
