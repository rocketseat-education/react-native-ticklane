import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing['3xl'],
    paddingHorizontal: theme.spacing.lg,
  };

  const iconWrapper: ViewStyle = {
    width: theme.sizes.controlLg,
    height: theme.sizes.controlLg,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
  };

  const textGroup: ViewStyle = {
    alignItems: 'center',
    gap: theme.spacing.xs,
    maxWidth: 320,
  };

  return {
    styles: StyleSheet.create({ root, iconWrapper, textGroup }),
    iconColor: theme.colors.textMuted,
    iconSize: theme.sizes.iconLg,
  };
};
