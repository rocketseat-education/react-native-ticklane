import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './author-badge.styles';

export type UseAuthorBadgeParams = {
  authorId?: string;
  isInteractive?: boolean;
};

export function useAuthorBadge({ authorId, isInteractive = true }: UseAuthorBadgeParams) {
  const router = useRouter();
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const isPressable = Boolean(authorId && isInteractive);
  const styles = useMemo(
    () => createStyles(theme, { isPressed: isPressed && isPressable }),
    [theme, isPressed, isPressable],
  );

  const handlePress = useCallback(() => {
    if (!authorId) {
      return;
    }

    router.push(ROUTES.author(authorId));
  }, [authorId, router]);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    styles,
    hitSlop: theme.sizes.hitSlop,
    isPressable,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
