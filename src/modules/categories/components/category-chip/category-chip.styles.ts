import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isSelected: boolean;
  isPressed: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    borderWidth: theme.sizes.borderThin,
    borderColor: config.isSelected ? theme.colors.primary : theme.colors.border,
    backgroundColor: config.isPressed || config.isSelected ? theme.colors.surfaceMuted : theme.colors.surface,
  };

  return {
    styles: StyleSheet.create({ root }),
    iconSize: theme.sizes.iconSm,
    iconColor: config.isSelected ? theme.colors.primary : theme.colors.textMuted,
    labelColor: config.isSelected ? theme.colors.primary : theme.colors.text,
  };
};
