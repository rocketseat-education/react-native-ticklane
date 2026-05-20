import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  };

  const star: ViewStyle = {
    padding: theme.spacing.xs,
  };

  return {
    styles: StyleSheet.create({ root, star }),
    starSize: theme.sizes.iconXl,
    activeColor: theme.colors.star,
    inactiveColor: theme.colors.borderStrong,
    hitSlop: theme.sizes.hitSlop,
  };
};
