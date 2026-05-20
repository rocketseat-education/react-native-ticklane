import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/text';

import { useSectionHeader } from './use-section-header';

export type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  const { styles } = useSectionHeader();

  return (
    <View style={styles.root}>
      <View style={styles.titleGroup}>
        <Text variant="h2">{title}</Text>
        {subtitle ? (
          <Text variant="bodySm" color="textMuted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
}
