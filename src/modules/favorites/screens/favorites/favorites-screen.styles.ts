import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const scrollContent: ViewStyle = {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing['3xl'],
  };

  const list: ViewStyle = {
    gap: theme.spacing.md,
  };

  // O `Container` aplica `paddingHorizontal: theme.spacing.lg` (16).
  // Para o CTA ficar a 20px de cada margem do ecrã (pedido do design)
  // acrescentamos 4px laterais e estendemos o wrapper.
  const guestCta: ViewStyle = {
    marginHorizontal: 20 - theme.spacing.lg,
    alignSelf: 'stretch',
  };

  return StyleSheet.create({ scrollContent, list, guestCta });
};
