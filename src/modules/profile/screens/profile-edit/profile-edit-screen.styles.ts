import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const kbAvoid: ViewStyle = {
    flex: 1,
  };

  const scroll: ViewStyle = {
    gap: theme.spacing['2xl'],
    paddingBottom: theme.spacing['3xl'],
  };

  const avatarBlock: ViewStyle = {
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const avatarActions: ViewStyle = {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const formBlock: ViewStyle = {
    gap: theme.spacing.lg,
  };

  const textarea: TextStyle = {
    minHeight: theme.sizes.controlMd * 2.5,
    textAlignVertical: 'top',
    fontFamily: theme.typography.family.sans,
    fontSize: theme.typography.variants.body.fontSize,
    lineHeight: theme.typography.variants.body.lineHeight,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: theme.sizes.borderThin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  };

  const submitRow: ViewStyle = {
    gap: theme.spacing.sm,
  };

  return StyleSheet.create({
    kbAvoid,
    scroll,
    avatarBlock,
    avatarActions,
    formBlock,
    textarea,
    submitRow,
  });
};
