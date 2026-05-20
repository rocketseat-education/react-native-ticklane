import { Feather } from '@expo/vector-icons';
import { Pressable, ScrollView } from 'react-native';

import { Text } from '@/components/text';
import type { Category } from '@/types';

import { CategoryChip } from '../category-chip';
import { useCategoryFilter } from './use-category-filter';

export type CategoryFilterProps = {
  categories: Category[];
  selectedCategoryId?: string | null;
  allLabel: string;
  onCategoryPress?: (category: Category | null) => void;
};

export function CategoryFilter({
  categories,
  selectedCategoryId,
  allLabel,
  onCategoryPress,
}: CategoryFilterProps) {
  const {
    styles,
    isAllSelected,
    allIconSize,
    allIconColor,
    allLabelColor,
    handleAllPress,
    handleCategoryPress,
  } = useCategoryFilter({ selectedCategoryId, onCategoryPress });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: isAllSelected }}
        onPress={handleAllPress}
        style={[styles.allChip, isAllSelected && styles.allChipSelected]}
      >
        <Feather name="grid" size={allIconSize} color={allIconColor} />
        <Text variant="bodyMedium" style={{ color: allLabelColor }}>
          {allLabel}
        </Text>
      </Pressable>

      {categories.map((category) => (
        <CategoryChip
          key={category.id}
          category={category}
          isSelected={selectedCategoryId === category.id}
          onPress={handleCategoryPress}
        />
      ))}
    </ScrollView>
  );
}
