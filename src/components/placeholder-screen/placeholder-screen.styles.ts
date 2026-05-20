import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const content: ViewStyle = {
    flex: 1,
    gap: theme.spacing.lg,
  };

  return StyleSheet.create({ content });
};
