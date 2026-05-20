import { useRouter, type Href } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { formatOfflineExecutionUpdatedAt } from '@/lib/offlineExecution';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useOfflineExecutions } from '@/modules/execution/hooks/use-offline-executions';
import {
  useChecklistsByAuthor,
  useCommentsByAuthor,
  useFavoriteChecklists,
} from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary, CommentWithAuthor, OfflineExecutionSummary } from '@/types';

import { createStyles } from './profile-screen.styles';

export function useProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isGuest, signOut } = useAuth();
  const requireAuth = useRequireAuth();
  const screenCopy = COPY.screens.profile;
  const sectionsCopy = screenCopy.sections;
  const authCopy = COPY.auth;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const authoredChecklists = useChecklistsByAuthor(currentUser.id, currentUser.id);
  const favoriteChecklists = useFavoriteChecklists(isGuest ? null : currentUser.id);
  const authoredComments = useCommentsByAuthor(currentUser.id);

  const myChecklists: ChecklistSummary[] = isGuest ? [] : authoredChecklists;
  const myFavorites: ChecklistSummary[] = isGuest ? [] : favoriteChecklists;
  const myComments: CommentWithAuthor[] = isGuest ? [] : authoredComments;
  const { executions: runningExecutions } = useOfflineExecutions();

  const handleConnectPress = useCallback(() => {
    router.push(ROUTES.auth);
  }, [router]);

  const handleEditPress = useCallback(() => {
    router.push(ROUTES.profileEdit);
  }, [router]);

  const handleLogoutPress = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleChecklistPress = useCallback(
    (checklist: ChecklistSummary) => {
      router.push(ROUTES.checklistDetails(checklist.id));
    },
    [router],
  );

  const handleCreatePress = useCallback(async () => {
    const ok = await requireAuth('create');

    if (ok) {
      router.push(ROUTES.create);
    }
  }, [requireAuth, router]);

  const handleExploreFavorites = useCallback(async () => {
    const ok = await requireAuth('favorite');

    if (ok) {
      router.push(ROUTES.tabs.search);
    }
  }, [requireAuth, router]);

  const handleExploreComments = useCallback(async () => {
    const ok = await requireAuth('comment');

    if (ok) {
      router.push(ROUTES.tabs.search);
    }
  }, [requireAuth, router]);

  const handleExploreHome = useCallback(() => {
    router.push(ROUTES.tabs.home);
  }, [router]);

  const handleRunningExecutionPress = useCallback(
    (execution: OfflineExecutionSummary) => {
      router.push(ROUTES.execution(execution.id));
    },
    [router],
  );

  const handleRunningSeeAllPress = useCallback(() => {
    router.push(ROUTES.runningExecutionsList as Href);
  }, [router]);

  const handleMyChecklistsSeeAllPress = useCallback(() => {
    router.push(ROUTES.profileMyChecklistsList as Href);
  }, [router]);

  const handleMyFavoritesSeeAllPress = useCallback(() => {
    router.push(ROUTES.profileMyFavoritesList as Href);
  }, [router]);

  const runningProgressOf = sectionsCopy.runningExecutions.progressOf;

  const guestEmptyDescriptions = {
    myChecklists: sectionsCopy.myChecklists.guestEmptyDescription,
    myFavorites: sectionsCopy.myFavorites.guestEmptyDescription,
    myComments: sectionsCopy.myComments.guestEmptyDescription,
    runningExecutions: sectionsCopy.runningExecutions.guestEmptyDescription,
  };

  const subtitle = isGuest ? screenCopy.guestSubtitle : screenCopy.authenticatedSubtitle;

  return {
    styles,
    title: screenCopy.title,
    subtitle,
    sectionsCopy,
    guestBadgeLabel: authCopy.guestBadge,
    connectLabel: screenCopy.connectCta,
    logoutLabel: screenCopy.logoutCta,
    editLabel: screenCopy.editCta,
    currentUser,
    isGuest,
    myChecklists,
    myFavorites,
    myComments,
    runningExecutions,
    runningProgressOf,
    formatRunningExecutionDate: formatOfflineExecutionUpdatedAt,
    guestEmptyDescriptions,
    handleConnectPress,
    handleEditPress,
    handleLogoutPress,
    handleChecklistPress,
    handleCreatePress,
    handleExploreFavorites,
    handleExploreComments,
    handleExploreHome,
    handleRunningExecutionPress,
    handleRunningSeeAllPress,
    handleMyChecklistsSeeAllPress,
    handleMyFavoritesSeeAllPress,
  };
}
