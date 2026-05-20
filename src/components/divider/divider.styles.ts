import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export type DividerOrientation = 'horizontal' | 'vertical';

type StylesConfig = {
  orientation: DividerOrientation;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle =
    config.orientation === 'horizontal'
      ? {
          width: '100%',
          height: theme.sizes.borderHairline,
          backgroundColor: theme.colors.border,
        }
      : {
          height: '100%',
          width: theme.sizes.borderHairline,
          backgroundColor: theme.colors.border,
        };

  return StyleSheet.create({ root });
};
