import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Input } from '@/components/input';
import { Text } from '@/components/text';

import { useTagInput } from './use-tag-input';

export type TagInputProps = {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
};

export function TagInput({ tags, onAdd, onRemove }: TagInputProps) {
  const {
    styles,
    placeholder,
    iconColor,
    iconSize,
    hitSlop,
    removeAccessibilityLabel,
    draft,
    handleDraftChange,
    handleSubmitEditing,
  } = useTagInput({ onAdd });

  return (
    <View style={styles.root}>
      <Input
        value={draft}
        onChangeText={handleDraftChange}
        onSubmitEditing={handleSubmitEditing}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        blurOnSubmit={false}
      />

      {tags.length ? (
        <View style={styles.tags}>
          {tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text variant="caption" color="textMuted">
                #{tag}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${removeAccessibilityLabel} ${tag}`}
                hitSlop={hitSlop}
                onPress={() => onRemove(tag)}
              >
                <Feather name="x" size={iconSize} color={iconColor} />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
