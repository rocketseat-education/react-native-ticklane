import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './horizontal-list.styles';

export function useHorizontalList() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
