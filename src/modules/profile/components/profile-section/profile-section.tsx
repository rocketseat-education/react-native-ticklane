import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';

import { useProfileSection } from './use-profile-section';

export type ProfileSectionProps = {
  title: string;
  isEmpty: boolean;
  emptyTitle: string;
  emptyDescription: string;
  ctaLabel: string;
  onCtaPress: () => void;
  children?: ReactNode;
  headerAction?: ReactNode;
};

export function ProfileSection({
  title,
  isEmpty,
  emptyTitle,
  emptyDescription,
  ctaLabel,
  onCtaPress,
  children,
  headerAction,
}: ProfileSectionProps) {
  const { styles } = useProfileSection();

  return (
    <View style={styles.root}>
      <SectionHeader title={title} action={headerAction} />

      {isEmpty ? (
        <Card>
          <View style={styles.emptyContent}>
            <View style={styles.emptyText}>
              <Text variant="bodyMedium">{emptyTitle}</Text>
              <Text variant="bodySm" color="textMuted">
                {emptyDescription}
              </Text>
            </View>
            <Button variant="secondary" size="md" label={ctaLabel} onPress={onCtaPress} />
          </View>
        </Card>
      ) : (
        children
      )}
    </View>
  );
}
