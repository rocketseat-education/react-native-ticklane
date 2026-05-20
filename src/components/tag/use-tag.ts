import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles, type TagTone } from './tag.styles';

export type UseTagParams = {
  tone: TagTone;
};

export function useTag({ tone }: UseTagParams) {
  const { theme } = useTheme();

  const computed = useMemo(() => createStyles(theme, { tone }), [theme, tone]);

  return computed;
}
