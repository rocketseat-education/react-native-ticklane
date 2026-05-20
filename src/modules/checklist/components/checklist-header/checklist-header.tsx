import { Pressable, View } from 'react-native';

import { RatingStars } from '@/components/rating-stars';
import { Text } from '@/components/text';
import type { ChecklistDetails } from '@/types';

import { AuthorBadge } from '../author-badge';
import { FavoriteButton } from '../favorite-button';
import { TagsList } from '../tags-list';
import { useChecklistHeader } from './use-checklist-header';

export type ChecklistHeaderProps = {
  checklist: ChecklistDetails;
  onRatePress?: () => void;
};

export function ChecklistHeader({ checklist, onRatePress }: ChecklistHeaderProps) {
  const { styles, hitSlop, ratingAccessibilityLabel } = useChecklistHeader({ checklist });

  return (
    <View style={styles.root}>
      <View style={styles.titleGroup}>
        <Text variant="display">{checklist.title}</Text>
        <Text variant="body" color="textMuted">
          {checklist.description}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <AuthorBadge
          name={checklist.authorName}
          initials={checklist.authorInitials}
          authorId={checklist.authorId}
        />
        <View style={styles.metaActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={ratingAccessibilityLabel}
            hitSlop={hitSlop}
            onPress={onRatePress}
            style={styles.ratingPressable}
          >
            <RatingStars rating={checklist.averageRating} />
          </Pressable>
          <FavoriteButton checklistId={checklist.id} />
        </View>
      </View>

      <TagsList tags={checklist.tags} />
    </View>
  );
}
