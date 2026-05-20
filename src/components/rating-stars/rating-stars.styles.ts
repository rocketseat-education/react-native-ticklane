import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  };

  const stars: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  };

  return {
    styles: StyleSheet.create({ root, stars }),
    starSize: theme.sizes.iconXs,
    activeColor: theme.colors.star,
    inactiveColor: theme.colors.borderStrong,
  };
};
