import { StyleSheet, type DimensionValue, type ViewStyle } from 'react-native';

import type { RadiusToken, Theme } from '@/theme';

type StylesConfig = {
  width: DimensionValue;
  height: DimensionValue;
  radius: RadiusToken;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    width: config.width,
    height: config.height,
    borderRadius: theme.radii[config.radius],
    backgroundColor: theme.colors.surfaceMuted,
  };

  return StyleSheet.create({ root });
};
