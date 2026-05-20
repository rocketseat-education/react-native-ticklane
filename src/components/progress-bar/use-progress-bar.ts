import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './progress-bar.styles';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;

export type UseProgressBarParams = {
  value: number;
  total: number;
};

export function useProgressBar({ value, total }: UseProgressBarParams) {
  const { theme } = useTheme();

  const percentage = total > MIN_PERCENTAGE ? Math.round((value / total) * MAX_PERCENTAGE) : MIN_PERCENTAGE;
  const clampedPercentage = Math.min(MAX_PERCENTAGE, Math.max(MIN_PERCENTAGE, percentage));
  const styles = useMemo(
    () => createStyles(theme, { percentage: clampedPercentage }),
    [theme, clampedPercentage],
  );

  return {
    styles,
    accessibilityValue: {
      min: MIN_PERCENTAGE,
      max: MAX_PERCENTAGE,
      now: clampedPercentage,
    },
  };
}
