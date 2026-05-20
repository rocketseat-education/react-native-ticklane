import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './item-header.styles';

export function useItemHeader() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
