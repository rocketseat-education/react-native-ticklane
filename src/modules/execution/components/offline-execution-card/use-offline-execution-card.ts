import { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { OfflineExecutionSummary } from '@/types';

import { createStyles } from './offline-execution-card.styles';

export type OfflineExecutionCardVariant = 'strip' | 'fill';

export type UseOfflineExecutionCardParams = {
  execution: OfflineExecutionSummary;
  progressCaption: string;
  dateCaption: string;
  variant?: OfflineExecutionCardVariant;
  onPress?: (execution: OfflineExecutionSummary) => void;
};

export function useOfflineExecutionCard({
  execution,
  progressCaption,
  dateCaption,
  variant = 'strip',
  onPress,
}: UseOfflineExecutionCardParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const styles = useMemo(
    () => createStyles(theme, { isPressed, variant }),
    [theme, isPressed, variant],
  );

  const handlePress = useCallback(() => {
    onPress?.(execution);
  }, [execution, onPress]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  return {
    styles,
    progressCaption,
    dateCaption,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
