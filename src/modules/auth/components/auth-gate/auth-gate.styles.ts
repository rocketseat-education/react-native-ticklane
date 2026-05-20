import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const kbAvoid: ViewStyle = {
    gap: theme.spacing.lg,
  };

  const header: ViewStyle = {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  };

  const iconWrapper: ViewStyle = {
    width: theme.sizes.avatarLg,
    height: theme.sizes.avatarLg,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  };

  const cancelButton: ViewStyle = {
    alignSelf: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  };

  return StyleSheet.create({
    kbAvoid,
    header,
    iconWrapper,
    cancelButton,
  });
};
