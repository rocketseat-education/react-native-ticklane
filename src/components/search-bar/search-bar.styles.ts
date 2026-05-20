import { StyleSheet } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      color: theme.colors.textSubtle,
    },
  });
