import { Fragment, type ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { useHorizontalList } from './use-horizontal-list';

export type HorizontalListProps<TItem> = {
  data: TItem[];
  keyExtractor: (item: TItem) => string;
  renderItem: (item: TItem) => ReactNode;
};

export function HorizontalList<TItem>({ data, keyExtractor, renderItem }: HorizontalListProps<TItem>) {
  const { styles } = useHorizontalList();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {data.map((item) => (
        <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
      ))}
    </ScrollView>
  );
}
