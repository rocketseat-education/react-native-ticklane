import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './search-bar.styles';

export function useSearchBar() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return {
    styles,
    iconSize: theme.sizes.iconMd,
  };
}
