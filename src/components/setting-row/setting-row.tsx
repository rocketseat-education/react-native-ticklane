import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Card } from '@/components/card';
import { Text } from '@/components/text';

import { useSettingRow } from './use-setting-row';

export type SettingRowProps = {
  label: string;
  description?: string;
  children: ReactNode;
};

export function SettingRow({ label, description, children }: SettingRowProps) {
  const { styles } = useSettingRow();

  return (
    <Card>
      <View style={styles.root}>
        <View style={styles.labelGroup}>
          <Text variant="h3" color="text">
            {label}
          </Text>
          {description ? (
            <Text variant="bodySm" color="textMuted">
              {description}
            </Text>
          ) : null}
        </View>

        {children}
      </View>
    </Card>
  );
}
