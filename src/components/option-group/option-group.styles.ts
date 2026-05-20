import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isSelected: boolean;
  isPressed: boolean;
};

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  };

  return StyleSheet.create({ root });
};

export const createOptionStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    flex: 1,
    minHeight: theme.sizes.controlMd,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.md,
    borderWidth: theme.sizes.borderThin,
    borderColor: config.isSelected ? theme.colors.primary : theme.colors.border,
    backgroundColor: config.isPressed
      ? theme.colors.surfaceMuted
      : config.isSelected
        ? theme.colors.surfaceMuted
        : theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return {
    styles: StyleSheet.create({ root }),
    labelColor: config.isSelected ? theme.colors.primary : theme.colors.text,
  };
};
