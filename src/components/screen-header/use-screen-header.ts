import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './screen-header.styles';

export function useScreenHeader() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
