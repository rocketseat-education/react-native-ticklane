import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

type StylesConfig = {
  tone: BadgeTone;
};

const toneMap = (theme: Theme): Record<BadgeTone, { background: string; label: string }> => ({
  neutral: { background: theme.colors.surfaceMuted, label: theme.colors.textMuted },
  primary: { background: theme.colors.primary, label: theme.colors.primaryContrast },
  success: { background: theme.colors.success, label: theme.colors.primaryContrast },
  warning: { background: theme.colors.warning, label: theme.colors.primaryContrast },
  danger: { background: theme.colors.danger, label: theme.colors.primaryContrast },
});

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const toneTokens = toneMap(theme)[config.tone];

  const root: ViewStyle = {
    minWidth: theme.sizes.iconLg,
    height: theme.sizes.iconLg,
    paddingHorizontal: theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.pill,
    backgroundColor: toneTokens.background,
  };

  return {
    styles: StyleSheet.create({ root }),
    labelColor: toneTokens.label,
  };
};
