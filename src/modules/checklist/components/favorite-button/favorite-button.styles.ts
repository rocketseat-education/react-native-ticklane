import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isPressed: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    width: theme.sizes.controlSm,
    height: theme.sizes.controlSm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.pill,
    backgroundColor: config.isPressed ? theme.colors.surfaceMuted : theme.colors.transparent,
  };

  return StyleSheet.create({ root });
};
