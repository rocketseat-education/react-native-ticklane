import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './comment-item.styles';

type UseCommentItemParams = {
  authorId: string;
};

export function useCommentItem({ authorId }: UseCommentItemParams) {
  const router = useRouter();
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleAuthorPress = useCallback(() => {
    router.push(ROUTES.author(authorId));
  }, [authorId, router]);

  return {
    styles,
    hitSlop: theme.sizes.hitSlop,
    handleAuthorPress,
  };
}
