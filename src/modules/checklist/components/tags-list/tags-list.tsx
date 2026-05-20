import { View } from 'react-native';

import { Tag } from '@/components/tag';

import { useTagsList } from './use-tags-list';

export type TagsListProps = {
  tags: string[];
};

export function TagsList({ tags }: TagsListProps) {
  const { styles } = useTagsList();

  return (
    <View style={styles.root}>
      {tags.map((tag) => (
        <Tag key={tag} label={tag} />
      ))}
    </View>
  );
}
