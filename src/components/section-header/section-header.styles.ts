import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  };

  const titleGroup: ViewStyle = {
    flex: 1,
    gap: theme.spacing.xs,
  };

  return StyleSheet.create({ root, titleGroup });
};
