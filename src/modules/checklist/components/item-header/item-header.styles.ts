import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.sm,
  };

  const links: ViewStyle = {
    marginTop: theme.spacing.sm,
  };

  return StyleSheet.create({ root, links });
};
