import { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { createStyles } from './checklist-list-item.styles';

export type UseChecklistListItemParams = {
  checklist: ChecklistSummary;
  onPress?: (checklist: ChecklistSummary) => void;
};

export function useChecklistListItem({ checklist, onPress }: UseChecklistListItemParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(() => createStyles(theme, { isPressed }), [theme, isPressed]);

  const handlePress = useCallback(() => {
    onPress?.(checklist);
  }, [checklist, onPress]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  return {
    styles,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
