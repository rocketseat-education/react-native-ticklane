import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.md,
  };

  const emptyContent: ViewStyle = {
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  };

  const emptyText: ViewStyle = {
    gap: theme.spacing.xs,
  };

  return StyleSheet.create({ root, emptyContent, emptyText });
};
