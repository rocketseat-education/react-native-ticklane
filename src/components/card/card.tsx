import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

import type { RadiusToken, ShadowToken, SpacingToken } from '@/theme';

import { useCard } from './use-card';
import type { CardSurface } from './card.styles';

export type CardProps = ViewProps & {
  children: ReactNode;
  surface?: CardSurface;
  padding?: SpacingToken;
  radius?: RadiusToken;
  shadow?: ShadowToken;
  withBorder?: boolean;
};

export function Card({
  children,
  surface = 'surface',
  padding = 'lg',
  radius = 'lg',
  shadow = 'none',
  withBorder = true,
  style,
  ...rest
}: CardProps) {
  const { styles } = useCard({ surface, padding, radius, shadow, withBorder });

  return (
    <View {...rest} style={[styles.root, style]}>
      {children}
    </View>
  );
}
