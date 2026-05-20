import { Feather } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable } from 'react-native';

import { Text } from '@/components/text';
import type { Category } from '@/types';

import { useCategoryChip } from './use-category-chip';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

export type CategoryChipProps = {
  category: Category;
  isSelected?: boolean;
  onPress?: (category: Category) => void;
};

export function CategoryChip({ category, isSelected = false, onPress }: CategoryChipProps) {
  const {
    styles,
    iconSize,
    iconColor,
    labelColor,
    handlePress,
    handlePressIn,
    handlePressOut,
  } = useCategoryChip({ category, isSelected, onPress });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.root}
    >
      {category.icon ? (
        <Feather name={category.icon as FeatherIconName} size={iconSize} color={iconColor} />
      ) : null}
      <Text variant="bodyMedium" style={{ color: labelColor }}>
        {category.name}
      </Text>
    </Pressable>
  );
}
