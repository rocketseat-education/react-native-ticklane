import { Feather } from '@expo/vector-icons';
import { Pressable } from 'react-native';

import { useCheckbox } from './use-checkbox';
import type { CheckboxSize } from './checkbox.styles';

export type CheckboxProps = {
  isChecked: boolean;
  onChange?: (next: boolean) => void;
  size?: CheckboxSize;
  isDisabled?: boolean;
  accessibilityLabel?: string;
};

export function Checkbox({
  isChecked,
  onChange,
  size = 'md',
  isDisabled = false,
  accessibilityLabel,
}: CheckboxProps) {
  const { styles, iconSize, iconColor, handlePress } = useCheckbox({
    size,
    isChecked,
    isDisabled,
    onChange,
  });

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled: isDisabled }}
      accessibilityLabel={accessibilityLabel}
      onPress={handlePress}
      disabled={isDisabled}
      style={styles.root}
    >
      {isChecked ? <Feather name="check" size={iconSize} color={iconColor} /> : null}
    </Pressable>
  );
}
