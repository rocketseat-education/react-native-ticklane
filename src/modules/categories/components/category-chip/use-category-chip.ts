import { useCallback, useMemo, useState } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { Category } from '@/types';

import { createStyles } from './category-chip.styles';

export type UseCategoryChipParams = {
  category: Category;
  isSelected: boolean;
  onPress?: (category: Category) => void;
};

export function useCategoryChip({ category, isSelected, onPress }: UseCategoryChipParams) {
  const { theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const computed = useMemo(
    () => createStyles(theme, { isSelected, isPressed }),
    [theme, isSelected, isPressed],
  );

  const handlePress = useCallback(() => {
    onPress?.(category);
  }, [category, onPress]);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  return {
    ...computed,
    handlePress,
    handlePressIn,
    handlePressOut,
  };
}
