import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  percentage: number;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    width: '100%',
    height: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.surfaceMuted,
    overflow: 'hidden',
  };

  const fill: ViewStyle = {
    width: `${config.percentage}%`,
    height: '100%',
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.primary,
  };

  return StyleSheet.create({ root, fill });
};
