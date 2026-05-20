import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isPressed: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    width: theme.sizes.cardWide,
    height: theme.sizes.cardWideHeight,
    justifyContent: 'space-between',
    opacity: config.isPressed ? 0.86 : 1,
  };

  const metaRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  };

  const content: ViewStyle = {
    gap: theme.spacing.sm,
    flex: 1,
    marginTop: theme.spacing.md,
  };

  const footer: ViewStyle = {
    marginTop: theme.spacing.md,
  };

  return StyleSheet.create({ root, metaRow, content, footer });
};
