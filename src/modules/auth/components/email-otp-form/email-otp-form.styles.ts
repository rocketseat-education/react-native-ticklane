import { StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const root: ViewStyle = {
    gap: theme.spacing.md,
  };

  const helperRow: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const linkBtn: ViewStyle = {
    paddingVertical: theme.spacing.xs,
  };

  const feedbackInfo: TextStyle = {
    color: theme.colors.textMuted,
  };

  const feedbackError: TextStyle = {
    color: theme.colors.danger,
  };

  const codeInput: TextStyle = {
    letterSpacing: 6,
    textAlign: 'center',
    fontSize: theme.typography.variants.h2.fontSize,
  };

  return StyleSheet.create({
    root,
    helperRow,
    linkBtn,
    feedbackInfo,
    feedbackError,
    codeInput,
  });
};
