import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  };

  const titleGroup: ViewStyle = {
    flex: 1,
    gap: theme.spacing.xs,
  };

  const slot: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  };

  return StyleSheet.create({ root, titleGroup, slot });
};
