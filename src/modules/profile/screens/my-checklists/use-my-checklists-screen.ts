import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useChecklistsByAuthor, useLibrary } from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { createStyles } from './my-checklists-screen.styles';

export function useMyChecklistsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const { reload } = useLibrary();
  const requireAuth = useRequireAuth();
  const screenCopy = COPY.screens.profileMyChecklistsList;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const viewerId = isGuest ? null : currentUser.id;
  const checklists = useChecklistsByAuthor(currentUser.id, viewerId);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleChecklistPress = useCallback(
    (checklist: ChecklistSummary) => {
      router.push(ROUTES.checklistDetails(checklist.id));
    },
    [router],
  );

  const handleExplorePress = useCallback(() => {
    router.push(ROUTES.tabs.search);
  }, [router]);

  const handleConnectPress = useCallback(() => {
    router.push(ROUTES.auth);
  }, [router]);

  const handleCreatePress = useCallback(async () => {
    const ok = await requireAuth('create');

    if (ok) {
      router.push(ROUTES.create);
    }
  }, [requireAuth, router]);

  const emptyDescription = isGuest ? screenCopy.guestEmptyDescription : screenCopy.emptyDescription;

  return {
    styles,
    screenCopy,
    checklists,
    isGuest,
    emptyDescription,
    connectLabel: COPY.screens.profile.connectCta,
    handleBack,
    handleChecklistPress,
    handleExplorePress,
    handleConnectPress,
    handleCreatePress,
  };
}
