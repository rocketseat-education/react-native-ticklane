import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { COPY } from '@/constants/copy';
import { OfflineExecutionCard } from '@/modules/execution/components/offline-execution-card';

import { useRunningExecutionsScreen } from './use-running-executions-screen';

export function RunningExecutionsScreen() {
  const {
    styles,
    screenCopy,
    executions,
    progressOf,
    formatRunningExecutionDate,
    handleBack,
    handleExecutionPress,
    handleExploreHome,
  } = useRunningExecutionsScreen();

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

        <ScreenHeader title={screenCopy.title} subtitle={screenCopy.subtitle} />

        {executions.length === 0 ? (
          <EmptyState
            title={screenCopy.emptyTitle}
            description={screenCopy.emptyDescription}
            renderIcon={({ size, color }) => <Feather name="inbox" size={size} color={color} />}
            action={
              <Button variant="secondary" size="md" label={screenCopy.exploreCta} onPress={handleExploreHome} />
            }
          />
        ) : (
          <View style={styles.list}>
            {executions.map((execution) => (
              <OfflineExecutionCard
                key={execution.id}
                variant="fill"
                execution={execution}
                progressCaption={progressOf(execution.doneCount, execution.totalCount)}
                dateCaption={formatRunningExecutionDate(execution.startedAt)}
                onPress={handleExecutionPress}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
