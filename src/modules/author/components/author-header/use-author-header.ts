import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { User } from '@/types';

import { createStyles } from './author-header.styles';

type UseAuthorHeaderParams = {
  user: User;
};

export function useAuthorHeader({ user }: UseAuthorHeaderParams) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const username = `@${user.username}`;

  return {
    styles,
    username,
  };
}
