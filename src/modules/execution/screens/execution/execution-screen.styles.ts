import { StyleSheet, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

export const createStyles = (theme: Theme) => {
  const scrollContent: ViewStyle = {
    gap: theme.spacing['2xl'],
    paddingBottom: theme.spacing['3xl'],
  };

  const topBar: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const section: ViewStyle = {
    gap: theme.spacing.md,
  };

  const list: ViewStyle = {
    gap: theme.spacing.md,
  };

  const notice: ViewStyle = {
    gap: theme.spacing.xs,
  };

  const progressRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  };

  const progressBarWrap: ViewStyle = {
    flex: 1,
  };

  const itemRow: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  };

  const itemBody: ViewStyle = {
    flex: 1,
    gap: theme.spacing.xs,
  };

  const center: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['3xl'],
    gap: theme.spacing.md,
  };

  return StyleSheet.create({
    scrollContent,
    topBar,
    section,
    list,
    notice,
    progressRow,
    progressBarWrap,
    itemRow,
    itemBody,
    center,
  });
};
