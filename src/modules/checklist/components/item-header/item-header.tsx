import { View } from 'react-native';

import { Text } from '@/components/text';
import type { ChecklistItem } from '@/types';

import { LinksList } from '../links-list';
import { useItemHeader } from './use-item-header';

export type ItemHeaderProps = {
  item: ChecklistItem;
  itemLabel: string;
};

export function ItemHeader({ item, itemLabel }: ItemHeaderProps) {
  const { styles } = useItemHeader();

  return (
    <View style={styles.root}>
      <Text variant="caption" color="primary">
        {itemLabel} {item.order}
      </Text>
      <Text variant="display">{item.title}</Text>
      {item.description ? (
        <Text variant="body" color="textMuted">
          {item.description}
        </Text>
      ) : null}
      {item.links?.length ? (
        <View style={styles.links}>
          <LinksList links={item.links} />
        </View>
      ) : null}
    </View>
  );
}
