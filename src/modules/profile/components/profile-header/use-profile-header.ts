import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { User } from '@/types';

import { createStyles } from './profile-header.styles';

type UseProfileHeaderParams = {
  user: User;
};

export function useProfileHeader({ user }: UseProfileHeaderParams) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const isGuest = Boolean(user.isGuest);

  const displayName = user.displayName;
  const displaySubtitle = user.email
    ? user.email
    : user.username
      ? `@${user.username}`
      : '';

  return {
    styles,
    isGuest,
    displayName,
    displaySubtitle,
  };
}
