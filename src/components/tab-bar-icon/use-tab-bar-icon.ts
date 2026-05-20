import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './tab-bar-icon.styles';

export function useTabBarIcon() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const iconSize = theme.sizes.iconLg;

  return { styles, iconSize };
}
