import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isAllSelected: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const content: ViewStyle = {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.lg,
  };

  const allChip: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    borderWidth: theme.sizes.borderThin,
    borderColor: config.isAllSelected ? theme.colors.primary : theme.colors.border,
    backgroundColor: config.isAllSelected ? theme.colors.surfaceMuted : theme.colors.surface,
  };

  const allChipSelected: ViewStyle = {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceMuted,
  };

  return StyleSheet.create({ content, allChip, allChipSelected });
};
