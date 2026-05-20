import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const scrollContent: ViewStyle = {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing['3xl'],
  };

  const topBar: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const list: ViewStyle = {
    gap: theme.spacing.md,
  };

  const emptyActions: ViewStyle = {
    gap: theme.spacing.md,
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
  };

  return StyleSheet.create({ scrollContent, topBar, list, emptyActions });
};
