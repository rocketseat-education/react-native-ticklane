import { Pressable, View } from 'react-native';

import { Card } from '@/components/card';
import { RatingStars } from '@/components/rating-stars';
import { Text } from '@/components/text';
import type { ChecklistSummary } from '@/types';

import { AuthorBadge } from '../author-badge';
import { useChecklistCard } from './use-checklist-card';

export type ChecklistCardProps = {
  checklist: ChecklistSummary;
  onPress?: (checklist: ChecklistSummary) => void;
};

export function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const { styles, handlePress, handlePressIn, handlePressOut } = useChecklistCard({
    checklist,
    onPress,
  });

  return (
    <Pressable onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Card style={styles.root} surface="surfaceElevated">
        <View style={styles.metaRow}>
          <Text variant="caption" color="primary" numberOfLines={1}>
            {checklist.categoryName}
          </Text>
          <RatingStars rating={checklist.averageRating} />
        </View>

        <View style={styles.content}>
          <Text variant="h3" numberOfLines={2}>
            {checklist.title}
          </Text>
          {checklist.description ? (
            <Text variant="bodySm" color="textMuted" numberOfLines={2}>
              {checklist.description}
            </Text>
          ) : null}
        </View>

        <View style={styles.footer}>
          <AuthorBadge
            name={checklist.authorName}
            initials={checklist.authorInitials}
            authorId={checklist.authorId}
          />
        </View>
      </Card>
    </Pressable>
  );
}
