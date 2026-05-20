import { useCallback, useMemo } from 'react';

import { useTheme } from '@/theme/use-theme';

import { createStyles } from './bottom-sheet.styles';

type UseBottomSheetParams = {
  onRequestClose: () => void;
  closeOnBackdropPress: boolean;
};

export function useBottomSheet({ onRequestClose, closeOnBackdropPress }: UseBottomSheetParams) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdropPress) {
      onRequestClose();
    }
  }, [closeOnBackdropPress, onRequestClose]);

  return {
    styles,
    handleBackdropPress,
  };
}
