import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './interactive-rating-stars.styles';

const MAX_RATING = 5;

type UseInteractiveRatingStarsParams = {
  value: number;
  isDisabled: boolean;
};

export function useInteractiveRatingStars({ value }: UseInteractiveRatingStarsParams) {
  const { theme } = useTheme();

  const computed = useMemo(() => createStyles(theme), [theme]);

  const stars = useMemo(
    () =>
      Array.from({ length: MAX_RATING }, (_, index) => {
        const score = index + 1;

        return {
          id: `star-${score}`,
          score,
          isActive: score <= value,
        };
      }),
    [value],
  );

  return {
    ...computed,
    stars,
  };
}
