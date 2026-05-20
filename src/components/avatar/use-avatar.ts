import { useMemo } from 'react';

import type { TypographyVariant } from '@/theme';
import { useTheme } from '@/theme/use-theme';

import type { AvatarProps, AvatarSize } from './avatar';
import { createStyles } from './avatar.styles';

const variantBySize: Record<AvatarSize, TypographyVariant> = {
  sm: 'caption',
  md: 'bodySm',
  lg: 'bodyMedium',
  xl: 'h1',
};

const FALLBACK_INITIAL = '?';

const buildInitialsFromName = (name?: string) => {
  if (!name) {
    return FALLBACK_INITIAL;
  }

  const parts = name
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) {
    return FALLBACK_INITIAL;
  }

  const [first, second] = parts;
  const firstChar = first?.charAt(0) ?? '';
  const secondChar = second?.charAt(0) ?? '';

  return (firstChar + secondChar).toUpperCase() || FALLBACK_INITIAL;
};

export function useAvatar({ initials, imageUrl, name, size }: Required<Pick<AvatarProps, 'size'>> & AvatarProps) {
  const { theme } = useTheme();

  const styles = useMemo(() => createStyles(theme, { size }), [theme, size]);

  const resolvedInitials = useMemo(() => {
    if (initials && initials.length) {
      return initials.slice(0, 2).toUpperCase();
    }

    return buildInitialsFromName(name);
  }, [initials, name]);

  const accessibilityLabel = name ?? resolvedInitials;

  return {
    styles,
    resolvedInitials,
    textVariant: variantBySize[size],
    hasImage: Boolean(imageUrl),
    accessibilityLabel,
  };
}
