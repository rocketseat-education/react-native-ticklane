import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { COPY } from '@/constants/copy';
import { ChecklistListItem } from '@/modules/checklist/components';

import { useMyChecklistsScreen } from './use-my-checklists-screen';

export function MyChecklistsScreen() {
  const {
    styles,
    screenCopy,
    checklists,
    isGuest,
    emptyDescription,
    connectLabel,
    handleBack,
    handleChecklistPress,
    handleExplorePress,
    handleConnectPress,
    handleCreatePress,
  } = useMyChecklistsScreen();

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

        {checklists.length ? (
          <View style={styles.list}>
            {checklists.map((checklist) => (
              <ChecklistListItem
                key={checklist.id}
                checklist={checklist}
                onPress={handleChecklistPress}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title={screenCopy.emptyTitle}
            description={emptyDescription}
            renderIcon={({ size, color }) => <Feather name="folder" size={size} color={color} />}
            action={
              <View style={styles.emptyActions}>
                {isGuest ? (
                  <Button
                    variant="primary"
                    size="md"
                    isFullWidth
                    label={connectLabel}
                    onPress={handleConnectPress}
                  />
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    isFullWidth
                    label={screenCopy.createCta}
                    onPress={handleCreatePress}
                  />
                )}
                <Button
                  variant="secondary"
                  size="md"
                  isFullWidth
                  label={screenCopy.exploreCta}
                  onPress={handleExplorePress}
                />
              </View>
            }
          />
        )}
      </ScrollView>
    </Container>
  );
}
