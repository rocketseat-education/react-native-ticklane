import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './comments-list.styles';

export function useCommentsList() {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return { styles };
}
