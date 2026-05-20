import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/text';

import { useEmptyState } from './use-empty-state';

export type EmptyStateIconRenderProps = {
  size: number;
  color: string;
};

export type EmptyStateProps = {
  title: string;
  description?: string;
  renderIcon?: (props: EmptyStateIconRenderProps) => ReactNode;
  action?: ReactNode;
};

export function EmptyState({ title, description, renderIcon, action }: EmptyStateProps) {
  const { styles, iconColor, iconSize } = useEmptyState();

  return (
    <View style={styles.root}>
      {renderIcon ? (
        <View style={styles.iconWrapper}>{renderIcon({ size: iconSize, color: iconColor })}</View>
      ) : null}

      <View style={styles.textGroup}>
        <Text variant="h2" color="text" align="center">
          {title}
        </Text>
        {description ? (
          <Text variant="body" color="textMuted" align="center">
            {description}
          </Text>
        ) : null}
      </View>

      {action}
    </View>
  );
}
