import { useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { useTheme } from '@/theme/use-theme';
import type { ChecklistDetails } from '@/types';

import { createStyles } from './checklist-header.styles';

export type UseChecklistHeaderParams = {
  checklist: ChecklistDetails;
};

export function useChecklistHeader({ checklist }: UseChecklistHeaderParams) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  return {
    styles,
    hitSlop: theme.sizes.hitSlop,
    ratingAccessibilityLabel: COPY.actions.rateChecklist,
    checklist,
  };
}
