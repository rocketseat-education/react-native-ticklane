import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.md,
  };

  const header: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  };

  const meta: ViewStyle = {
    flex: 1,
    gap: theme.spacing.xs,
  };

  return StyleSheet.create({ root, header, meta });
};
