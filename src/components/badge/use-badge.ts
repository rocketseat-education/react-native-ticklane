import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles, type BadgeTone } from './badge.styles';

export type UseBadgeParams = {
  tone: BadgeTone;
};

export function useBadge({ tone }: UseBadgeParams) {
  const { theme } = useTheme();

  return useMemo(() => createStyles(theme, { tone }), [theme, tone]);
}
