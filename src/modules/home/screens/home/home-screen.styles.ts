import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const scrollContent: ViewStyle = {
    gap: theme.spacing['2xl'],
    paddingBottom: theme.spacing['3xl'],
  };

  const section: ViewStyle = {
    gap: theme.spacing.md,
  };

  const list: ViewStyle = {
    gap: theme.spacing.md,
  };

  return StyleSheet.create({ scrollContent, section, list });
};
