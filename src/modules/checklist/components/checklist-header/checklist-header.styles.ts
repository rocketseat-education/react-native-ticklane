import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.lg,
  };

  const titleGroup: ViewStyle = {
    gap: theme.spacing.sm,
  };

  const metaRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  };

  const metaActions: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  };

  const ratingPressable: ViewStyle = {
    paddingVertical: theme.spacing.xs,
  };

  return StyleSheet.create({ root, titleGroup, metaRow, metaActions, ratingPressable });
};
