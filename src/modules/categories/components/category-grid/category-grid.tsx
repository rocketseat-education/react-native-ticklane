import { View } from 'react-native';

import type { Category } from '@/types';

import { CategoryChip } from '../category-chip';
import { useCategoryGrid } from './use-category-grid';

export type CategoryGridProps = {
  categories: Category[];
  selectedCategoryId?: string | null;
  onCategoryPress?: (category: Category) => void;
};

export function CategoryGrid({ categories, selectedCategoryId, onCategoryPress }: CategoryGridProps) {
  const { styles } = useCategoryGrid();

  return (
    <View style={styles.root}>
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isSelected={category.id === selectedCategoryId}
          onPress={onCategoryPress}
        />
      ))}
    </View>
  );
}
