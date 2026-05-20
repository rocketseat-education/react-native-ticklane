import { Pressable, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { Text } from '@/components/text';
import type { CommentWithAuthor } from '@/types';

import { useCommentItem } from './use-comment-item';

export type CommentItemProps = {
  comment: CommentWithAuthor;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { styles, hitSlop, handleAuthorPress } = useCommentItem({ authorId: comment.authorId });

  return (
    <Card>
      <View style={styles.root}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={comment.authorName}
          hitSlop={hitSlop}
          onPress={handleAuthorPress}
          style={styles.header}
        >
          <Avatar size="md" name={comment.authorName} initials={comment.authorInitials} />
          <View style={styles.meta}>
            <Text variant="bodyMedium">{comment.authorName}</Text>
            <Text variant="caption" color="textSubtle">
              {comment.relativeCreatedAt}
            </Text>
          </View>
        </Pressable>

        <Text variant="body" color="textMuted">
          {comment.content}
        </Text>
      </View>
    </Card>
  );
}
