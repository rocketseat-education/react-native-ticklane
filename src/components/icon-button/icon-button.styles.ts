import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type IconButtonSize = 'sm' | 'md' | 'lg';

type StylesConfig = {
  variant: IconButtonVariant;
  size: IconButtonSize;
  isPressed: boolean;
  isDisabled: boolean;
};

const sizeMap = (
  theme: Theme,
): Record<IconButtonSize, { dimension: number; iconSize: number }> => ({
  sm: { dimension: theme.sizes.controlSm, iconSize: theme.sizes.iconSm },
  md: { dimension: theme.sizes.controlMd, iconSize: theme.sizes.iconMd },
  lg: { dimension: theme.sizes.controlLg, iconSize: theme.sizes.iconLg },
});

const variantMap = (
  theme: Theme,
): Record<
  IconButtonVariant,
  { background: string; pressedBackground: string; border: string; tint: string }
> => ({
  primary: {
    background: theme.colors.primary,
    pressedBackground: theme.colors.primaryMuted,
    border: theme.colors.transparent,
    tint: theme.colors.primaryContrast,
  },
  secondary: {
    background: theme.colors.surfaceElevated,
    pressedBackground: theme.colors.surfaceMuted,
    border: theme.colors.border,
    tint: theme.colors.text,
  },
  ghost: {
    background: theme.colors.transparent,
    pressedBackground: theme.colors.surfaceMuted,
    border: theme.colors.transparent,
    tint: theme.colors.text,
  },
  danger: {
    background: theme.colors.danger,
    pressedBackground: theme.colors.danger,
    border: theme.colors.transparent,
    tint: theme.colors.primaryContrast,
  },
});

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const sizeTokens = sizeMap(theme)[config.size];
  const variantTokens = variantMap(theme)[config.variant];

  const root: ViewStyle = {
    width: sizeTokens.dimension,
    height: sizeTokens.dimension,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.pill,
    borderWidth: theme.sizes.borderThin,
    borderColor: variantTokens.border,
    backgroundColor: config.isPressed ? variantTokens.pressedBackground : variantTokens.background,
    opacity: config.isDisabled ? 0.5 : 1,
  };

  return {
    styles: StyleSheet.create({ root }),
    iconSize: sizeTokens.iconSize,
    iconColor: variantTokens.tint,
  };
};
