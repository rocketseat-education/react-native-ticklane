import { useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './items-editor.styles';

export function useItemsEditor() {
  const { theme } = useTheme();
  const copy = COPY.screens.create;

  const styles = useMemo(() => createStyles(theme), [theme]);

  return {
    styles,
    addLabel: copy.addItem,
    titlePlaceholder: copy.fields.itemTitlePlaceholder,
    descriptionPlaceholder: copy.fields.itemDescriptionPlaceholder,
    removeAccessibilityLabel: copy.removeItem,
    iconColor: theme.colors.textMuted,
    iconSize: theme.sizes.iconSm,
    hitSlop: theme.sizes.hitSlop,
    addIcon: {
      size: theme.sizes.iconSm,
      color: theme.colors.text,
    },
  };
}
