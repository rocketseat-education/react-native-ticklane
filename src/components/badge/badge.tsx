import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/text';

import { useBadge } from './use-badge';
import type { BadgeTone } from './badge.styles';

export type BadgeProps = {
  count?: number;
  children?: ReactNode;
  tone?: BadgeTone;
  max?: number;
};

export function Badge({ count, children, tone = 'neutral', max = 99 }: BadgeProps) {
  const { styles, labelColor } = useBadge({ tone });

  const display = children ?? (typeof count === 'number' ? (count > max ? `${max}+` : String(count)) : null);

  if (display === null) {
    return null;
  }

  return (
    <View style={styles.root}>
      <Text variant="caption" style={{ color: labelColor }}>
        {display}
      </Text>
    </View>
  );
}
