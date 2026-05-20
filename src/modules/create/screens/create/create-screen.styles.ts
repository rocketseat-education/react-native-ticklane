import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const flex: ViewStyle = {
    flex: 1,
  };

  const scrollContent: ViewStyle = {
    gap: theme.spacing['2xl'],
    paddingBottom: theme.spacing['3xl'],
  };

  const section: ViewStyle = {
    gap: theme.spacing.md,
  };

  const loading: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return StyleSheet.create({ flex, scrollContent, section, loading });
};
