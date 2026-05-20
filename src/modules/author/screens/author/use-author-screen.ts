import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/modules/auth/context';
import {
  useAuthorById,
  useAuthorStats,
  useChecklistsByAuthor,
} from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { createStyles } from './author-screen.styles';

export type UseAuthorScreenParams = {
  id: string;
};

export function useAuthorScreen({ id }: UseAuthorScreenParams) {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const viewerId = isGuest ? null : currentUser.id;

  const screenCopy = COPY.screens.author;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const author = useAuthorById(id);
  const checklists = useChecklistsByAuthor(id, viewerId);
  const authorStats = useAuthorStats(id);

  const stats = useMemo(() => {
    if (!author) {
      return [];
    }

    return [
      { label: screenCopy.stats.checklists, value: checklists.length },
      { label: screenCopy.stats.comments, value: authorStats.commentsCount },
      { label: screenCopy.stats.favorites, value: authorStats.favoritesSum },
    ];
  }, [author, checklists.length, authorStats, screenCopy.stats]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleChecklistPress = useCallback(
    (checklist: ChecklistSummary) => {
      router.push(ROUTES.checklistDetails(checklist.id));
    },
    [router],
  );

  return {
    styles,
    author,
    checklists,
    stats,
    checklistsTitle: screenCopy.checklistsTitle,
    emptyTitle: screenCopy.emptyTitle,
    emptyDescription: screenCopy.emptyDescription,
    notFoundTitle: screenCopy.notFoundTitle,
    notFoundDescription: screenCopy.notFoundDescription,
    handleBack,
    handleChecklistPress,
  };
}
