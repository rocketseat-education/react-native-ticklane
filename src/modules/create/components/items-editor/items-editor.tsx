import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { Text } from '@/components/text';

import { useItemsEditor } from './use-items-editor';

export type DraftItem = {
  tempId: string;
  title: string;
  description: string;
};

export type ItemsEditorProps = {
  items: DraftItem[];
  onChangeItemTitle: (tempId: string, value: string) => void;
  onChangeItemDescription: (tempId: string, value: string) => void;
  onRemoveItem: (tempId: string) => void;
  onAddItem: () => void;
};

export function ItemsEditor({
  items,
  onChangeItemTitle,
  onChangeItemDescription,
  onRemoveItem,
  onAddItem,
}: ItemsEditorProps) {
  const {
    styles,
    addLabel,
    titlePlaceholder,
    descriptionPlaceholder,
    removeAccessibilityLabel,
    iconColor,
    iconSize,
    hitSlop,
    addIcon,
  } = useItemsEditor();

  return (
    <View style={styles.root}>
      {items.map((item, index) => (
        <Card key={item.tempId}>
          <View style={styles.itemRoot}>
            <View style={styles.itemHeader}>
              <Text variant="caption" color="textMuted">
                {index + 1}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={removeAccessibilityLabel}
                hitSlop={hitSlop}
                onPress={() => onRemoveItem(item.tempId)}
              >
                <Feather name="x" size={iconSize} color={iconColor} />
              </Pressable>
            </View>

            <Input
              value={item.title}
              onChangeText={(value) => onChangeItemTitle(item.tempId, value)}
              placeholder={titlePlaceholder}
            />
            <Input
              value={item.description}
              onChangeText={(value) => onChangeItemDescription(item.tempId, value)}
              placeholder={descriptionPlaceholder}
              multiline
            />
          </View>
        </Card>
      ))}

      <Button
        variant="secondary"
        size="md"
        label={addLabel}
        onPress={onAddItem}
        leftIcon={<Feather name="plus" size={addIcon.size} color={addIcon.color} />}
      />
    </View>
  );
}
