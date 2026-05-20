import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const listContent: ViewStyle = {
    paddingBottom: theme.spacing['3xl'],
    flexGrow: 1,
  };

  const controls: ViewStyle = {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  };

  const itemGap: ViewStyle = {
    height: theme.spacing.md,
  };

  const loaderWrap: ViewStyle = {
    paddingVertical: theme.spacing.xl,
    alignItems: 'center',
  };

  const footerLoader: ViewStyle = {
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  };

  const inlineMessage: ViewStyle = {
    marginBottom: theme.spacing.md,
  };

  const listRefreshBanner: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
  };

  return StyleSheet.create({
    listContent,
    controls,
    itemGap,
    loaderWrap,
    footerLoader,
    inlineMessage,
    listRefreshBanner,
  });
};
