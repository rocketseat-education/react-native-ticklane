import { StyleSheet, type ImageStyle, type ViewStyle } from 'react-native';

import type { Theme } from '@/theme';

import type { AvatarSize } from './avatar';

type StylesConfig = {
  size: AvatarSize;
};

const sizeMap: Record<AvatarSize, keyof Theme['sizes']> = {
  sm: 'avatarSm',
  md: 'avatarMd',
  lg: 'avatarLg',
  xl: 'avatarXl',
};

export const createStyles = (theme: Theme, config: StylesConfig) => {
  const dimension = theme.sizes[sizeMap[config.size]];

  const root: ViewStyle = {
    width: dimension,
    height: dimension,
    borderRadius: theme.radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: theme.sizes.borderHairline,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  };

  const image: ImageStyle = {
    width: dimension,
    height: dimension,
    borderRadius: theme.radii.pill,
  };

  return StyleSheet.create({ root, image });
};
