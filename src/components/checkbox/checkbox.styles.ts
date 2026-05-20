import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export type CheckboxSize = 'sm' | 'md' | 'lg';

type StylesConfig = {
  size: CheckboxSize;
  isChecked: boolean;
  isDisabled: boolean;
};

const sizeMap = (theme: Theme): Record<CheckboxSize, { dimension: number; iconSize: number }> => ({
  sm: { dimension: theme.sizes.iconLg, iconSize: theme.sizes.iconSm },
  md: { dimension: theme.sizes.iconXl, iconSize: theme.sizes.iconMd },
  lg: { dimension: theme.sizes.controlSm, iconSize: theme.sizes.iconLg },
});

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const sizeTokens = sizeMap(theme)[config.size];

  const root: ViewStyle = {
    width: sizeTokens.dimension,
    height: sizeTokens.dimension,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.sm,
    borderWidth: theme.sizes.borderThin,
    borderColor: config.isChecked ? theme.colors.primary : theme.colors.borderStrong,
    backgroundColor: config.isChecked ? theme.colors.primary : theme.colors.transparent,
    opacity: config.isDisabled ? 0.5 : 1,
  };

  return {
    styles: StyleSheet.create({ root }),
    iconSize: sizeTokens.iconSize,
    iconColor: theme.colors.primaryContrast,
  };
};
