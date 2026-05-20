import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const kbAvoid: ViewStyle = {
    flex: 1,
  };

  const content: ViewStyle = {
    gap: theme.spacing['2xl'],
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing['3xl'],
  };

  const footer: ViewStyle = {
    paddingHorizontal: theme.spacing.lg,
  };

  return StyleSheet.create({ kbAvoid, content, footer });
};
