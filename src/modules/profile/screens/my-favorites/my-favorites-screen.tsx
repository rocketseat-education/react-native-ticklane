import { Feather } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/button';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { COPY } from '@/constants/copy';
import { ChecklistListItem } from '@/modules/checklist/components';

import { useMyFavoritesScreen } from './use-my-favorites-screen';

export function MyFavoritesScreen() {
  const {
    styles,
    screenCopy,
    favorites,
    isGuest,
    emptyDescription,
    connectLabel,
    handleBack,
    handleChecklistPress,
    handleExplorePress,
    handleConnectPress,
  } = useMyFavoritesScreen();

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

        {favorites.length ? (
          <View style={styles.list}>
            {favorites.map((checklist) => (
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
            renderIcon={({ size, color }) => <Feather name="bookmark" size={size} color={color} />}
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
                ) : null}
                <Button
                  variant={isGuest ? 'secondary' : 'primary'}
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
