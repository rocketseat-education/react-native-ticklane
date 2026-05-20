import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const keyboardRoot: ViewStyle = {
    flex: 1,
  };

  const backdrop: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  };

  const backdropPressable: ViewStyle = {
    ...StyleSheet.absoluteFillObject,
  };

  const sheet: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radii.xl,
    borderTopRightRadius: theme.radii.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing['2xl'],
    gap: theme.spacing.lg,
    borderTopWidth: theme.sizes.borderHairline,
    borderColor: theme.colors.border,
  };

  const sheetScrollContent: ViewStyle = {
    flexGrow: 1,
    paddingBottom: theme.spacing.xs,
  };

  const handle: ViewStyle = {
    alignSelf: 'center',
    width: theme.spacing['2xl'],
    height: theme.spacing.xs,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.border,
  };

  return StyleSheet.create({ keyboardRoot, backdrop, backdropPressable, sheet, sheetScrollContent, handle });
};
