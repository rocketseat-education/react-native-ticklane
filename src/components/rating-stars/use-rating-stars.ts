import { useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './rating-stars.styles';

const MAX_RATING = 5;

export type UseRatingStarsParams = {
  rating: number;
  showValue: boolean;
};

export function useRatingStars({ rating, showValue }: UseRatingStarsParams) {
  const { theme } = useTheme();

  const computed = useMemo(() => createStyles(theme), [theme]);
  const roundedRating = Math.round(rating);
  const stars = Array.from({ length: MAX_RATING }, (_, index) => ({
    id: `star-${index}`,
    isActive: index < roundedRating,
  }));
  const value = showValue ? rating.toFixed(1) : null;

  return {
    ...computed,
    stars,
    value,
  };
}
