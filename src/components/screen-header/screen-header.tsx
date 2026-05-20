import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/text';

import { useScreenHeader } from './use-screen-header';

export type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
};

export function ScreenHeader({ title, subtitle, leftSlot, rightSlot }: ScreenHeaderProps) {
  const { styles } = useScreenHeader();

  return (
    <View style={styles.root}>
      {leftSlot ? <View style={styles.slot}>{leftSlot}</View> : null}

      <View style={styles.titleGroup}>
        <Text variant="h1" color="text">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="bodySm" color="textMuted">
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightSlot ? <View style={styles.slot}>{rightSlot}</View> : null}
    </View>
  );
}
