import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './tags-list.styles';

export function useTagsList() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
