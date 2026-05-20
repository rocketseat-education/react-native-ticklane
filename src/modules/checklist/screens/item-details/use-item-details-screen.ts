import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { useChecklistItem, useCommentsByItem, useLibrary } from '@/state/library';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './item-details-screen.styles';

export type UseItemDetailsScreenParams = {
  checklistId: string;
  itemId: string;
};

export function useItemDetailsScreen({ checklistId, itemId }: UseItemDetailsScreenParams) {
  const router = useRouter();
  const { theme } = useTheme();
  const { reload } = useLibrary();
  const screenCopy = COPY.screens.itemDetails;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const item = useChecklistItem(checklistId, itemId);
  const comments = useCommentsByItem(itemId);

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    styles,
    item,
    comments,
    itemLabel: screenCopy.itemLabel,
    commentsTitle: screenCopy.commentsTitle,
    noCommentsTitle: screenCopy.noCommentsTitle,
    noCommentsDescription: screenCopy.noCommentsDescription,
    notFoundTitle: screenCopy.notFoundTitle,
    notFoundDescription: screenCopy.notFoundDescription,
    handleBack,
  };
}
