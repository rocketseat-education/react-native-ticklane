import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './section-header.styles';

export function useSectionHeader() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
