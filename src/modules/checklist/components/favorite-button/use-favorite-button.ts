import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';

import { COPY } from '@/constants/copy';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useLibrary } from '@/state/library';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './favorite-button.styles';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

type UseFavoriteButtonParams = {
  checklistId: string;
};

export function useFavoriteButton({ checklistId }: UseFavoriteButtonParams) {
  const { theme } = useTheme();
  const { currentUser, isGuest, getLatestUser } = useAuth();
  const { isFavorite, toggleFavorite } = useLibrary();
  const requireAuth = useRequireAuth();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(() => createStyles(theme, { isPressed }), [theme, isPressed]);

  const isFav = isFavorite(checklistId, isGuest ? null : currentUser.id);

  const iconName: IoniconsName = isFav ? 'bookmark' : 'bookmark-outline';
  const iconColor = isFav ? theme.colors.primary : theme.colors.textMuted;
  const iconSize = theme.sizes.iconMd;

  const handlePress = useCallback(async () => {
    const ok = await requireAuth('favorite');

    if (!ok) {
      return;
    }

    toggleFavorite(checklistId, getLatestUser().id);
  }, [checklistId, getLatestUser, requireAuth, toggleFavorite]);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    styles,
    isFavorite: isFav,
    iconName,
    iconColor,
    iconSize,
    hitSlop: theme.sizes.hitSlop,
    accessibilityLabel: isFav ? COPY.actions.unfavorite : COPY.actions.favorite,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
