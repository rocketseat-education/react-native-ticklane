import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isPressed: boolean;
  variant: 'strip' | 'fill';
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    width: config.variant === 'fill' ? '100%' : theme.sizes.cardWide,
    height: theme.sizes.offlineExecutionCardHeight,
    justifyContent: 'space-between',
    opacity: config.isPressed ? 0.86 : 1,
    alignSelf: config.variant === 'fill' ? 'stretch' : 'auto',
  };

  const metaRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  };

  const content: ViewStyle = {
    gap: theme.spacing.xs,
    flex: 1,
    marginTop: theme.spacing.sm,
    minHeight: 0,
  };

  const dateRow: ViewStyle = {
    marginTop: theme.spacing.xs,
  };

  return StyleSheet.create({ root, metaRow, content, dateRow });
};
