import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.md,
  };

  const labelGroup: ViewStyle = {
    gap: theme.spacing.xs,
  };

  return StyleSheet.create({ root, labelGroup });
};
