import { ScrollView } from 'react-native';

import { CategoryChip } from '@/modules/categories/components';
import type { Category } from '@/types';

import { useCategorySelector } from './use-category-selector';

export type CategorySelectorProps = {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelect: (category: Category) => void;
};

export function CategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
}: CategorySelectorProps) {
  const { styles } = useCategorySelector();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isSelected={selectedCategoryId === category.id}
          onPress={onSelect}
        />
      ))}
    </ScrollView>
  );
}
