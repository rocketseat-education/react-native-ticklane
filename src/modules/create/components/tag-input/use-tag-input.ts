import { useCallback, useMemo, useState } from 'react';

import { COPY } from '@/constants/copy';
import { useTheme } from '@/theme/use-theme';

import { createStyles } from './tag-input.styles';

type UseTagInputParams = {
  onAdd: (tag: string) => void;
};

const sanitize = (value: string) =>
  value
    .trim()
    .replace(/^#/, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

export function useTagInput({ onAdd }: UseTagInputParams) {
  const { theme } = useTheme();
  const [draft, setDraft] = useState('');
  const copy = COPY.screens.create;

  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleDraftChange = useCallback((next: string) => {
    setDraft(next);
  }, []);

  const handleSubmitEditing = useCallback(() => {
    const next = sanitize(draft);

    if (!next) {
      return;
    }

    onAdd(next);
    setDraft('');
  }, [draft, onAdd]);

  return {
    styles,
    placeholder: copy.fields.tagsPlaceholder,
    iconColor: theme.colors.textMuted,
    iconSize: theme.sizes.iconXs,
    hitSlop: theme.sizes.hitSlop,
    removeAccessibilityLabel: copy.removeTag,
    draft,
    handleDraftChange,
    handleSubmitEditing,
  };
}
