import { Pressable, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Text } from '@/components/text';

import { useAuthorBadge } from './use-author-badge';

export type AuthorBadgeProps = {
  name: string;
  initials?: string;
  imageUrl?: string;
  authorId?: string;
  isInteractive?: boolean;
};

export function AuthorBadge({
  name,
  initials,
  imageUrl,
  authorId,
  isInteractive = true,
}: AuthorBadgeProps) {
  const { styles, hitSlop, isPressable, handlePress, handlePressIn, handlePressOut } = useAuthorBadge({
    authorId,
    isInteractive,
  });

  const content = (
    <>
      <Avatar size="sm" name={name} initials={initials} imageUrl={imageUrl} />
      <Text variant="bodySm" color="textMuted">
        {name}
      </Text>
    </>
  );

  if (!isPressable) {
    return <View style={styles.root}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={name}
      hitSlop={hitSlop}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.root}
    >
      {content}
    </Pressable>
  );
}
