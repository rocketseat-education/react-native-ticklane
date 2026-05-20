import { ActivityIndicator, Pressable, type GestureResponderEvent } from 'react-native';

import { Text } from '@/components/text';

import { useButton } from './use-button';
import type { ButtonSize, ButtonVariant } from './button.styles';

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  onPress,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const { styles, handlePress, handlePressIn, handlePressOut, isInteractive } = useButton({
    variant,
    size,
    isLoading,
    isDisabled,
    isFullWidth,
    onPress,
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: isLoading }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!isInteractive}
      style={styles.root}
    >
      {isLoading ? (
        <ActivityIndicator color={styles.label.color as string} />
      ) : (
        <>
          {leftIcon}
          <Text variant="bodyMedium" style={styles.label}>
            {label}
          </Text>
          {rightIcon}
        </>
      )}
    </Pressable>
  );
}
