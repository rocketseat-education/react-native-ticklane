import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

type StylesConfig = {
  variant: ButtonVariant;
  size: ButtonSize;
  isPressed: boolean;
  isDisabled: boolean;
  isFullWidth: boolean;
};

const sizeMap = (theme: Theme): Record<ButtonSize, { height: number; paddingX: number; gap: number }> => ({
  sm: { height: theme.sizes.controlSm, paddingX: theme.spacing.md, gap: theme.spacing.sm },
  md: { height: theme.sizes.controlMd, paddingX: theme.spacing.lg, gap: theme.spacing.sm },
  lg: { height: theme.sizes.controlLg, paddingX: theme.spacing.xl, gap: theme.spacing.md },
});

const variantMap = (
  theme: Theme,
): Record<
  ButtonVariant,
  { background: string; pressedBackground: string; border: string; label: string }
> => ({
  primary: {
    background: theme.colors.primary,
    pressedBackground: theme.colors.primaryMuted,
    border: theme.colors.transparent,
    label: theme.colors.primaryContrast,
  },
  secondary: {
    background: theme.colors.surfaceElevated,
    pressedBackground: theme.colors.surfaceMuted,
    border: theme.colors.border,
    label: theme.colors.text,
  },
  ghost: {
    background: theme.colors.transparent,
    pressedBackground: theme.colors.surfaceMuted,
    border: theme.colors.transparent,
    label: theme.colors.text,
  },
  danger: {
    background: theme.colors.danger,
    pressedBackground: theme.colors.danger,
    border: theme.colors.transparent,
    label: theme.colors.primaryContrast,
  },
});

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const sizeTokens = sizeMap(theme)[config.size];
  const variantTokens = variantMap(theme)[config.variant];

  const root: ViewStyle = {
    height: sizeTokens.height,
    paddingHorizontal: sizeTokens.paddingX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeTokens.gap,
    borderRadius: theme.radii.lg,
    borderWidth: theme.sizes.borderThin,
    borderColor: variantTokens.border,
    backgroundColor: config.isPressed ? variantTokens.pressedBackground : variantTokens.background,
    opacity: config.isDisabled ? 0.5 : 1,
    alignSelf: config.isFullWidth ? 'stretch' : 'flex-start',
  };

  return StyleSheet.create({
    root,
    label: {
      color: variantTokens.label,
    },
    spinner: {
      color: variantTokens.label,
    },
  });
};
