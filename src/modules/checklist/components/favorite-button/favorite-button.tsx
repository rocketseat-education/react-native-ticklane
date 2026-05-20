import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { useFavoriteButton } from './use-favorite-button';

export type FavoriteButtonProps = {
  checklistId: string;
};

export function FavoriteButton({ checklistId }: FavoriteButtonProps) {
  const {
    styles,
    isFavorite,
    iconName,
    iconColor,
    iconSize,
    hitSlop,
    accessibilityLabel,
    handlePress,
    handlePressIn,
    handlePressOut,
  } = useFavoriteButton({ checklistId });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: isFavorite }}
      hitSlop={hitSlop}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.root}
    >
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </Pressable>
  );
}
