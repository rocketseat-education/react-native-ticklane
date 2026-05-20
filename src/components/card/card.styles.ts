import { StyleSheet, type ViewStyle } from 'react-native';

import type { RadiusToken, ShadowToken, SpacingToken, Theme } from '@/theme';

export type CardSurface = 'surface' | 'surfaceMuted' | 'surfaceElevated';

type StylesConfig = {
  surface: CardSurface;
  padding: SpacingToken;
  radius: RadiusToken;
  shadow: ShadowToken;
  withBorder: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    backgroundColor: theme.colors[config.surface],
    padding: theme.spacing[config.padding],
    borderRadius: theme.radii[config.radius],
    borderWidth: config.withBorder ? theme.sizes.borderThin : 0,
    borderColor: theme.colors.border,
    ...theme.shadows[config.shadow],
  };

  return StyleSheet.create({ root });
};
