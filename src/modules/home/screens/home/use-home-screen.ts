import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/modules/auth/context';
import {
  usePopularChecklists,
  useRecentChecklists,
  useTrendingChecklists,
} from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { createStyles } from './home-screen.styles';

export function useHomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const viewerId = isGuest ? null : currentUser.id;
  const copy = COPY.screens.home;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const popularChecklists = usePopularChecklists(viewerId);
  const trendingChecklists = useTrendingChecklists(viewerId);
  const recentChecklists = useRecentChecklists(viewerId);

  const handleChecklistPress = useCallback(
    (checklist: ChecklistSummary) => {
      router.push(ROUTES.checklistDetails(checklist.id));
    },
    [router],
  );

  return {
    styles,
    title: copy.title,
    subtitle: copy.subtitle,
    popularTitle: copy.popularTitle,
    trendingTitle: copy.trendingTitle,
    recentTitle: copy.recentTitle,
    popularChecklists,
    trendingChecklists,
    recentChecklists,
    handleChecklistPress,
  };
}
