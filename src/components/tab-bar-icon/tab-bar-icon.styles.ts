import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.sizes.controlSm,
    height: theme.sizes.controlSm,
  };

  return StyleSheet.create({ root });
};
