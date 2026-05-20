import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { createOfflineExecutionFromChecklist } from '@/lib/offlineExecution';
import { useAuth } from '@/modules/auth/context';
import { useRequireAuth } from '@/modules/auth/gate';
import { useChecklist, useCommentsByChecklist, useLibrary } from '@/state/library';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistItem } from '@/types';

import { createStyles } from './details-screen.styles';

const MODAL_TRANSITION_MS = 350;

const wait = (ms: number) =>
  new Promise<void>((resolveWait) => {
    setTimeout(resolveWait, ms);
  });

export type UseDetailsScreenParams = {
  id: string;
};

export function useDetailsScreen({ id }: UseDetailsScreenParams) {
  const router = useRouter();
  const { theme } = useTheme();
  const { currentUser, isGuest } = useAuth();
  const { reload } = useLibrary();
  const requireAuth = useRequireAuth();
  const viewerId = isGuest ? null : currentUser.id;
  const screenCopy = COPY.screens.checklistDetails;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const checklist = useChecklist(id, viewerId);
  const isAuthor = Boolean(checklist && viewerId && checklist.authorId === viewerId);
  const comments = useCommentsByChecklist(id);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const [isRateSheetVisible, setIsRateSheetVisible] = useState(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleStartExecution = useCallback(async () => {
    if (!checklist) {
      return;
    }

    const executionId = await createOfflineExecutionFromChecklist(checklist);

    if (!executionId) {
      if (Platform.OS === 'web') {
        Alert.alert(COPY.screens.checklistDetails.title, COPY.screens.execution.webUnavailable);
      }

      return;
    }

    router.push(ROUTES.execution(executionId));
  }, [router, checklist]);

  const handleItemPress = useCallback(
    (item: ChecklistItem) => {
      router.push(ROUTES.itemDetails(id, item.id));
    },
    [router, id],
  );

  const handleRatePress = useCallback(async () => {
    const wasGuest = isGuest;
    const ok = await requireAuth('rate');

    if (!ok) {
      return;
    }

    if (wasGuest) {
      await wait(MODAL_TRANSITION_MS);
    }

    setIsRateSheetVisible(true);
  }, [isGuest, requireAuth]);

  const handleRateSheetClose = useCallback(() => {
    setIsRateSheetVisible(false);
  }, []);

  const handleEditPress = useCallback(async () => {
    const ok = await requireAuth('create');

    if (ok) {
      router.push(ROUTES.checklistEdit(id));
    }
  }, [id, requireAuth, router]);

  return {
    styles,
    title: screenCopy.title,
    subtitle: id,
    ctaLabel: screenCopy.cta,
    editLabel: screenCopy.editCta,
    isAuthor,
    itemsTitle: screenCopy.itemsTitle,
    linksTitle: screenCopy.linksTitle,
    commentsTitle: screenCopy.commentsTitle,
    emptyTitle: COPY.states.emptyTitle,
    emptyDescription: COPY.states.placeholderDescription,
    checklist,
    comments,
    isRateSheetVisible,
    handleBack,
    handleStartExecution,
    handleItemPress,
    handleRatePress,
    handleRateSheetClose,
    handleEditPress,
  };
}
