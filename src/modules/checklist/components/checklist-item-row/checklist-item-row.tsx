import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/text';
import type { ChecklistItem } from '@/types';

import { LinksList } from '../links-list';
import { useChecklistItemRow } from './use-checklist-item-row';

export type ChecklistItemRowProps = {
  item: ChecklistItem;
  onPress?: (item: ChecklistItem) => void;
};

export function ChecklistItemRow({ item, onPress }: ChecklistItemRowProps) {
  const {
    styles,
    chevronColor,
    chevronSize,
    isInteractive,
    handlePress,
    handlePressIn,
    handlePressOut,
  } = useChecklistItemRow({ item, onPress });

  const content = (
    <Card>
      <View style={styles.root}>
        <View style={styles.orderBadge}>
          <Text variant="caption" color="textMuted">
            {item.order}
          </Text>
        </View>

        <View style={styles.content}>
          <Text variant="bodyMedium">{item.title}</Text>
          {item.description ? (
            <Text variant="bodySm" color="textMuted">
              {item.description}
            </Text>
          ) : null}
          {item.links?.length ? (
            <View style={styles.links}>
              <LinksList links={item.links} />
            </View>
          ) : null}
        </View>

        {isInteractive ? (
          <Feather name="chevron-right" size={chevronSize} color={chevronColor} />
        ) : null}
      </View>
    </Card>
  );

  if (!isInteractive) {
    return content;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.pressable}
    >
      {content}
    </Pressable>
  );
}
