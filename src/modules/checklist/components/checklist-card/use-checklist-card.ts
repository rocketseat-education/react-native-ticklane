import { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { ChecklistSummary } from '@/types';

import { createStyles } from './checklist-card.styles';

export type UseChecklistCardParams = {
  checklist: ChecklistSummary;
  onPress?: (checklist: ChecklistSummary) => void;
};

export function useChecklistCard({ checklist, onPress }: UseChecklistCardParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(() => createStyles(theme, { isPressed }), [theme, isPressed]);

  const handlePress = useCallback(() => {
    onPress?.(checklist);
  }, [checklist, onPress]);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    styles,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
