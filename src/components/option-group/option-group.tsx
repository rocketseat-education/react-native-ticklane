import { Pressable, View } from 'react-native';

import { Text } from '@/components/text';

import { useOptionGroup, type OptionItem } from './use-option-group';

export type OptionGroupProps<TValue extends string> = {
  options: OptionItem<TValue>[];
  value: TValue;
  onChange: (next: TValue) => void;
  accessibilityLabel?: string;
};

export function OptionGroup<TValue extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: OptionGroupProps<TValue>) {
  const { containerStyles, getOptionState, handlePress, handlePressIn, handlePressOut } =
    useOptionGroup({ value, onChange });

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={containerStyles.root}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        const { styles, labelColor } = getOptionState(option.value);

        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={option.label}
            onPress={() => handlePress(option.value)}
            onPressIn={() => handlePressIn(option.value)}
            onPressOut={handlePressOut}
            style={styles.root}
          >
            <Text variant="bodyMedium" style={{ color: labelColor }}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
