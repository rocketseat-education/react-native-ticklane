import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, ScrollView, View } from 'react-native';

import { Card } from '@/components/card';
import { Checkbox } from '@/components/checkbox';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { ProgressBar } from '@/components/progress-bar';
import { SectionHeader } from '@/components/section-header';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';
import { LinksList } from '@/modules/checklist/components';

import { useExecutionScreen, type UseExecutionScreenParams } from './use-execution-screen';

export type ExecutionScreenProps = UseExecutionScreenParams;

export function ExecutionScreen({ id }: ExecutionScreenProps) {
  const {
    styles,
    screenCopy,
    detail,
    isLoading,
    isNotFound,
    doneCount,
    totalCount,
    handleBack,
    handleToggleItem,
  } = useExecutionScreen({ id });

  if (isLoading) {
    return (
      <Container>
        <View style={styles.topBar}>
          <IconButton
            variant="ghost"
            accessibilityLabel={COPY.actions.back}
            onPress={handleBack}
            renderIcon={({ size, color }) => <Feather name="arrow-left" size={size} color={color} />}
          />
        </View>
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      </Container>
    );
  }

  if (isNotFound || !detail) {
    return (
      <Container>
        <View style={styles.topBar}>
          <IconButton
            variant="ghost"
            accessibilityLabel={COPY.actions.back}
            onPress={handleBack}
            renderIcon={({ size, color }) => <Feather name="arrow-left" size={size} color={color} />}
          />
        </View>
        <EmptyState
          title={screenCopy.notFoundTitle}
          description={screenCopy.notFoundDescription}
          renderIcon={({ size, color }) => <Feather name="alert-circle" size={size} color={color} />}
        />
      </Container>
    );
  }

  return (
    <Container paddingVertical="none">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <IconButton
            variant="ghost"
            accessibilityLabel={COPY.actions.back}
            onPress={handleBack}
            renderIcon={({ size, color }) => <Feather name="arrow-left" size={size} color={color} />}
          />
        </View>

        <View style={styles.section}>
          <Text variant="caption" color="primary" numberOfLines={1}>
            {detail.categoryName}
          </Text>
          <Text variant="h2" numberOfLines={3}>
            {detail.title}
          </Text>
          {detail.description ? (
            <Text variant="bodySm" color="textMuted" numberOfLines={4}>
              {detail.description}
            </Text>
          ) : null}
        </View>

        <View style={styles.notice}>
          <Text variant="bodySm" color="textMuted">
            {screenCopy.offlineNotice}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.progressRow}>
            <Text variant="bodyMedium">{screenCopy.progressLabel}</Text>
            <Text variant="bodySm" color="textMuted">
              {screenCopy.progressCount(doneCount, totalCount)}
            </Text>
          </View>
          <View style={styles.progressBarWrap}>
            <ProgressBar value={doneCount} total={Math.max(totalCount, 1)} />
          </View>
        </View>

        {detail.links.length ? (
          <View style={styles.section}>
            <SectionHeader title={screenCopy.linksTitle} />
            <LinksList links={detail.links} />
          </View>
        ) : null}

        <View style={styles.section}>
          <SectionHeader title={screenCopy.itemsTitle} />
          <View style={styles.list}>
            {detail.items.map((item) => (
              <Card key={item.id}>
                <View style={styles.itemRow}>
                  <Checkbox
                    isChecked={item.checked}
                    onChange={(next) => {
                      void handleToggleItem(item, next);
                    }}
                    accessibilityLabel={item.title}
                  />
                  <View style={styles.itemBody}>
                    <Text variant="bodyMedium">{item.title}</Text>
                    {item.description ? (
                      <Text variant="bodySm" color="textMuted">
                        {item.description}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
