import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './category-selector.styles';

export function useCategorySelector() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
