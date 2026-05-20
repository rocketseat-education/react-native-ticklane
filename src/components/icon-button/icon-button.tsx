import { Pressable, type GestureResponderEvent } from 'react-native';

import { useIconButton } from './use-icon-button';
import type { IconButtonSize, IconButtonVariant } from './icon-button.styles';

export type IconRenderProps = {
  size: number;
  color: string;
};

export type IconButtonProps = {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isDisabled?: boolean;
  accessibilityLabel: string;
  onPress?: (event: GestureResponderEvent) => void;
  renderIcon: (props: IconRenderProps) => React.ReactNode;
};

export function IconButton({
  variant = 'ghost',
  size = 'md',
  isDisabled = false,
  accessibilityLabel,
  onPress,
  renderIcon,
}: IconButtonProps) {
  const { styles, iconSize, iconColor, handlePress, handlePressIn, handlePressOut } = useIconButton({
    variant,
    size,
    isDisabled,
    onPress,
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={styles.root}
    >
      {renderIcon({ size: iconSize, color: iconColor })}
    </Pressable>
  );
}
