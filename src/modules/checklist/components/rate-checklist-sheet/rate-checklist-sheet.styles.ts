import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const header: ViewStyle = {
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  };

  const actions: ViewStyle = {
    gap: theme.spacing.sm,
  };

  return StyleSheet.create({ header, actions });
};
