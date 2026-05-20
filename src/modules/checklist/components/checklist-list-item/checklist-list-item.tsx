import { Pressable, View } from 'react-native';

import { Card } from '@/components/card';
import { RatingStars } from '@/components/rating-stars';
import { Text } from '@/components/text';
import type { ChecklistSummary } from '@/types';

import { AuthorBadge } from '../author-badge';
import { FavoriteButton } from '../favorite-button';
import { useChecklistListItem } from './use-checklist-list-item';

export type ChecklistListItemProps = {
  checklist: ChecklistSummary;
  onPress?: (checklist: ChecklistSummary) => void;
};

export function ChecklistListItem({ checklist, onPress }: ChecklistListItemProps) {
  const { styles, handlePress, handlePressIn, handlePressOut } = useChecklistListItem({
    checklist,
    onPress,
  });

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.root}
    >
      <Card>
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.textGroup}>
              <Text variant="h3">{checklist.title}</Text>
              <Text variant="bodySm" color="textMuted" numberOfLines={2}>
                {checklist.description}
              </Text>
            </View>
            <FavoriteButton checklistId={checklist.id} />
          </View>

          <View style={styles.metaRow}>
            <AuthorBadge
              name={checklist.authorName}
              initials={checklist.authorInitials}
              authorId={checklist.authorId}
            />
            <RatingStars rating={checklist.averageRating} />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
