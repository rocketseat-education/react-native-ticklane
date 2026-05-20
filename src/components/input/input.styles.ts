import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isFocused: boolean;
  hasError: boolean;
  isDisabled: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const borderColor = config.hasError
    ? theme.colors.danger
    : config.isFocused
      ? theme.colors.primary
      : theme.colors.border;

  const root: ViewStyle = {
    gap: theme.spacing.xs,
  };

  const field: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: theme.sizes.controlMd,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
    borderRadius: theme.radii.lg,
    borderWidth: theme.sizes.borderThin,
    borderColor,
    backgroundColor: theme.colors.surface,
    opacity: config.isDisabled ? 0.6 : 1,
  };

  const input: TextStyle = {
    flex: 1,
    fontFamily: theme.typography.family.sans,
    fontSize: theme.typography.variants.body.fontSize,
    lineHeight: theme.typography.variants.body.lineHeight,
    color: theme.colors.text,
    paddingVertical: theme.spacing.sm,
  };

  return StyleSheet.create({
    root,
    field,
    input,
    placeholderColor: { color: theme.colors.textSubtle } as TextStyle,
  });
};
