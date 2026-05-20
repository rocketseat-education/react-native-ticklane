import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { useInteractiveRatingStars } from './use-interactive-rating-stars';

export type InteractiveRatingStarsProps = {
  value: number;
  onChange: (value: number) => void;
  accessibilityLabel: string;
  isDisabled?: boolean;
};

export function InteractiveRatingStars({
  value,
  onChange,
  accessibilityLabel,
  isDisabled = false,
}: InteractiveRatingStarsProps) {
  const { styles, stars, starSize, activeColor, inactiveColor, hitSlop } = useInteractiveRatingStars({
    value,
    isDisabled,
  });

  return (
    <View style={styles.root} accessibilityLabel={accessibilityLabel} accessibilityRole="adjustable">
      {stars.map((star) => (
        <Pressable
          key={star.id}
          accessibilityRole="button"
          accessibilityLabel={`${star.score}`}
          accessibilityState={{ selected: star.isActive, disabled: isDisabled }}
          hitSlop={hitSlop}
          disabled={isDisabled}
          onPress={() => onChange(star.score)}
          style={styles.star}
        >
          <Feather
            name="star"
            size={starSize}
            color={star.isActive ? activeColor : inactiveColor}
          />
        </Pressable>
      ))}
    </View>
  );
}
