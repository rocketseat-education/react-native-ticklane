import { Image } from 'expo-image';
import { View } from 'react-native';

import { Text } from '@/components/text';
import { resolveAssetUrl } from '@/lib/resolveAssetUrl';

import { useAvatar } from './use-avatar';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  initials?: string;
  imageUrl?: string | null;
  name?: string;
  size?: AvatarSize;
};

export function Avatar({ initials, imageUrl, name, size = 'md' }: AvatarProps) {
  const { styles, resolvedInitials, textVariant, accessibilityLabel } = useAvatar({
    initials,
    imageUrl: imageUrl ?? undefined,
    name,
    size,
  });

  const resolvedImage = resolveAssetUrl(imageUrl);

  return (
    <View style={styles.root} accessible accessibilityLabel={accessibilityLabel}>
      {resolvedImage ? (
        <Image source={resolvedImage} style={styles.image} contentFit="cover" />
      ) : (
        <Text variant={textVariant} color="text">
          {resolvedInitials}
        </Text>
      )}
    </View>
  );
}
