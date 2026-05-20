import { View } from 'react-native';

import type { CommentWithAuthor } from '@/types';

import { CommentItem } from '../comment-item';
import { useCommentsList } from './use-comments-list';

export type CommentsListProps = {
  comments: CommentWithAuthor[];
};

export function CommentsList({ comments }: CommentsListProps) {
  const { styles } = useCommentsList();

  return (
    <View style={styles.root}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </View>
  );
}
