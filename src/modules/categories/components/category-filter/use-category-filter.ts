import { useCallback, useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';
import type { Category } from '@/types';

import { createStyles } from './category-filter.styles';

type UseCategoryFilterParams = {
  selectedCategoryId?: string | null;
  onCategoryPress?: (category: Category | null) => void;
};

export function useCategoryFilter({
  selectedCategoryId,
  onCategoryPress,
}: UseCategoryFilterParams) {
  const { theme } = useTheme();
  const isAllSelected = !selectedCategoryId;
  const styles = useMemo(() => createStyles(theme, { isAllSelected }), [theme, isAllSelected]);

  const allIconSize = theme.sizes.iconSm;
  const allIconColor = isAllSelected ? theme.colors.primary : theme.colors.textMuted;
  const allLabelColor = isAllSelected ? theme.colors.primary : theme.colors.text;

  const handleAllPress = useCallback(() => {
    onCategoryPress?.(null);
  }, [onCategoryPress]);

  const handleCategoryPress = useCallback(
    (category: Category) => {
      onCategoryPress?.(category);
    },
    [onCategoryPress],
  );

  return {
    styles,
    isAllSelected,
    allIconSize,
    allIconColor,
    allLabelColor,
    handleAllPress,
    handleCategoryPress,
  };
}
