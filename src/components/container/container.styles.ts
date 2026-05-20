import { StyleSheet, type ViewStyle } from 'react-native';

import type { SpacingToken, Theme } from '@/theme';

type StylesConfig = {
  paddingHorizontal: SpacingToken;
  paddingVertical: SpacingToken;
  gap: SpacingToken | 'none';
  fillBackground: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    flex: 1,
    backgroundColor: config.fillBackground ? theme.colors.bg : theme.colors.transparent,
    paddingHorizontal: theme.spacing[config.paddingHorizontal],
    paddingVertical: theme.spacing[config.paddingVertical],
    gap: config.gap === 'none' ? undefined : theme.spacing[config.gap],
  };

  return StyleSheet.create({ root });
};
