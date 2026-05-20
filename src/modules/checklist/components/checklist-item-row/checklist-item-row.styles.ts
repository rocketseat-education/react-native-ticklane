import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isPressed: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const pressable: ViewStyle = {
    opacity: config.isPressed ? 0.86 : 1,
  };

  const root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  };

  const orderBadge: ViewStyle = {
    width: theme.sizes.iconXl,
    height: theme.sizes.iconXl,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
  };

  const content: ViewStyle = {
    flex: 1,
    gap: theme.spacing.xs,
  };

  const links: ViewStyle = {
    marginTop: theme.spacing.sm,
  };

  return StyleSheet.create({ pressable, root, orderBadge, content, links });
};
