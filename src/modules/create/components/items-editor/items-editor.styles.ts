import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.md,
  };

  const itemRoot: ViewStyle = {
    gap: theme.spacing.sm,
  };

  const itemHeader: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return StyleSheet.create({ root, itemRoot, itemHeader });
};
