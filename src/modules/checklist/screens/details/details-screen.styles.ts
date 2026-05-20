import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const scrollContent: ViewStyle = {
    gap: theme.spacing['2xl'],
    paddingBottom: theme.spacing['3xl'],
  };

  const topBar: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const section: ViewStyle = {
    gap: theme.spacing.md,
  };

  const list: ViewStyle = {
    gap: theme.spacing.md,
  };

  const emptyComments: ViewStyle = {
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
  };

  return StyleSheet.create({ scrollContent, topBar, section, list, emptyComments });
};
