import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.sm,
  };

  const item: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  };

  return {
    styles: StyleSheet.create({ root, item }),
    iconSize: theme.sizes.iconSm,
    iconColor: theme.colors.primary,
  };
};
