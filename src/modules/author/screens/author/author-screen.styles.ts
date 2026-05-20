import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const scrollContent: ViewStyle = {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing['3xl'],
  };

  const topBar: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const section: ViewStyle = {
    gap: theme.spacing.md,
  };

  const list: ViewStyle = {
    gap: theme.spacing.md,
  };

  return StyleSheet.create({ scrollContent, topBar, section, list });
};
