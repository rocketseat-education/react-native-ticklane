import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/modules/auth/context';
import { useFavoriteChecklists } from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { createStyles } from './favorites-screen.styles';

export function useFavoritesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const viewerId = isGuest ? null : currentUser.id;

  const copy = COPY.screens.favorites;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const favorites = useFavoriteChecklists(viewerId);

  const handleChecklistPress = useCallback(
    (checklist: ChecklistSummary) => {
      router.push(ROUTES.checklistDetails(checklist.id));
    },
    [router],
  );

  const handleConnectPress = useCallback(() => {
    router.push(ROUTES.auth);
  }, [router]);

  const emptyDescription = isGuest ? copy.guestEmptyDescription : copy.emptyDescription;

  return {
    styles,
    title: copy.title,
    subtitle: copy.subtitle,
    emptyTitle: COPY.states.emptyTitle,
    emptyDescription,
    connectLabel: COPY.screens.profile.connectCta,
    favorites,
    isGuest,
    handleChecklistPress,
    handleConnectPress,
  };
}
