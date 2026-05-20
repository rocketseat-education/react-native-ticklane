import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  };

  const identity: ViewStyle = {
    alignItems: 'center',
    gap: theme.spacing.xs,
  };

  const stats: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'stretch',
    paddingTop: theme.spacing.md,
    borderTopWidth: theme.sizes.borderHairline,
    borderTopColor: theme.colors.border,
  };

  const statItem: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.xs,
  };

  const statDivider: ViewStyle = {
    width: theme.sizes.borderHairline,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.border,
  };

  return StyleSheet.create({ root, identity, stats, statItem, statDivider });
};
