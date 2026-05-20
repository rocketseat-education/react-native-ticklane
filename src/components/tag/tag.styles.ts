import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export type TagTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'accent';

type StylesConfig = {
  tone: TagTone;
};

const toneMap = (
  theme: Theme,
): Record<TagTone, { background: string; label: string; border: string }> => ({
  neutral: {
    background: theme.colors.surfaceMuted,
    label: theme.colors.textMuted,
    border: theme.colors.border,
  },
  primary: {
    background: theme.colors.surfaceMuted,
    label: theme.colors.primary,
    border: theme.colors.border,
  },
  success: {
    background: theme.colors.surfaceMuted,
    label: theme.colors.success,
    border: theme.colors.border,
  },
  warning: {
    background: theme.colors.surfaceMuted,
    label: theme.colors.warning,
    border: theme.colors.border,
  },
  danger: {
    background: theme.colors.surfaceMuted,
    label: theme.colors.danger,
    border: theme.colors.border,
  },
  accent: {
    background: theme.colors.surfaceMuted,
    label: theme.colors.accent,
    border: theme.colors.border,
  },
});

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const toneTokens = toneMap(theme)[config.tone];

  const root: ViewStyle = {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.pill,
    borderWidth: theme.sizes.borderHairline,
    borderColor: toneTokens.border,
    backgroundColor: toneTokens.background,
    alignSelf: 'flex-start',
  };

  return {
    styles: StyleSheet.create({ root }),
    labelColor: toneTokens.label,
  };
};
