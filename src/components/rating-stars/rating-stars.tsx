import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';

import { Text } from '@/components/text';

import { useRatingStars } from './use-rating-stars';

export type RatingStarsProps = {
  rating: number;
  showValue?: boolean;
};

export function RatingStars({ rating, showValue = true }: RatingStarsProps) {
  const { styles, stars, value, starSize, activeColor, inactiveColor } = useRatingStars({
    rating,
    showValue,
  });

  return (
    <View style={styles.root}>
      <View style={styles.stars}>
        {stars.map((star) => (
          <Feather
            key={star.id}
            name="star"
            size={starSize}
            color={star.isActive ? activeColor : inactiveColor}
          />
        ))}
      </View>
      {value ? (
        <Text variant="caption" color="textMuted">
          {value}
        </Text>
      ) : null}
    </View>
  );
}
