import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const content: ViewStyle = {
    gap: theme.spacing.md,
    paddingRight: theme.spacing.lg,
  };

  return StyleSheet.create({ content });
};
