import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

type StylesConfig = {
  isPressed: boolean;
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const root: ViewStyle = {
    opacity: config.isPressed ? 0.86 : 1,
  };

  const content: ViewStyle = {
    gap: theme.spacing.md,
  };

  const topRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  };

  const textGroup: ViewStyle = {
    flex: 1,
    gap: theme.spacing.xs,
  };

  const metaRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  };

  return StyleSheet.create({ root, content, topRow, textGroup, metaRow });
};
