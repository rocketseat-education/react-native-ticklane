import { Pressable, ScrollView } from 'react-native';

import { Container } from '@/components/container';
import { HorizontalList } from '@/components/horizontal-list';
import { Text } from '@/components/text';
import { COPY } from '@/constants/copy';
import { ChecklistCard } from '@/modules/checklist/components';
import { OfflineExecutionCard } from '@/modules/execution/components/offline-execution-card';

import { ProfileHeader } from '../../components/profile-header';
import { ProfileSection } from '../../components/profile-section';
import { useProfileScreen } from './use-profile-screen';

export function ProfileScreen() {
  const {
    styles,
    sectionsCopy,
    guestBadgeLabel,
    connectLabel,
    logoutLabel,
    editLabel,
    currentUser,
    isGuest,
    myChecklists,
    myFavorites,
    runningExecutions,
    runningProgressOf,
    formatRunningExecutionDate,
    guestEmptyDescriptions,
    handleConnectPress,
    handleEditPress,
    handleLogoutPress,
    handleChecklistPress,
    handleCreatePress,
    handleExploreFavorites,
    handleExploreHome,
    handleRunningExecutionPress,
    handleRunningSeeAllPress,
    handleMyChecklistsSeeAllPress,
    handleMyFavoritesSeeAllPress,
  } = useProfileScreen();

  return (
    <Container paddingVertical="none">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          user={currentUser}
          guestBadgeLabel={guestBadgeLabel}
          connectLabel={connectLabel}
          logoutLabel={logoutLabel}
          editLabel={editLabel}
          onConnectPress={handleConnectPress}
          onEditPress={handleEditPress}
          onLogoutPress={handleLogoutPress}
        />

        <ProfileSection
          title={sectionsCopy.runningExecutions.title}
          isEmpty={runningExecutions.length === 0}
          emptyTitle={sectionsCopy.runningExecutions.emptyTitle}
          emptyDescription={
            isGuest
              ? guestEmptyDescriptions.runningExecutions
              : sectionsCopy.runningExecutions.emptyDescription
          }
          ctaLabel={sectionsCopy.runningExecutions.cta}
          onCtaPress={handleExploreHome}
          headerAction={
            runningExecutions.length > 0 ? (
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={COPY.actions.seeAll}
                onPress={handleRunningSeeAllPress}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text variant="bodySm" color="primary">
                  {COPY.actions.seeAll}
                </Text>
              </Pressable>
            ) : undefined
          }
        >
          <HorizontalList
            data={runningExecutions}
            keyExtractor={(execution) => execution.id}
            renderItem={(execution) => (
              <OfflineExecutionCard
                execution={execution}
                progressCaption={runningProgressOf(execution.doneCount, execution.totalCount)}
                dateCaption={formatRunningExecutionDate(execution.startedAt)}
                onPress={handleRunningExecutionPress}
              />
            )}
          />
        </ProfileSection>

        <ProfileSection
          title={sectionsCopy.myChecklists.title}
          isEmpty={myChecklists.length === 0}
          emptyTitle={sectionsCopy.myChecklists.emptyTitle}
          emptyDescription={
            isGuest
              ? guestEmptyDescriptions.myChecklists
              : sectionsCopy.myChecklists.emptyDescription
          }
          ctaLabel={sectionsCopy.myChecklists.cta}
          onCtaPress={handleCreatePress}
          headerAction={
            myChecklists.length > 0 ? (
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={COPY.actions.seeAll}
                onPress={handleMyChecklistsSeeAllPress}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text variant="bodySm" color="primary">
                  {COPY.actions.seeAll}s
                </Text>
              </Pressable>
            ) : undefined
          }
        >
          <HorizontalList
            data={myChecklists}
            keyExtractor={(checklist) => checklist.id}
            renderItem={(checklist) => (
              <ChecklistCard checklist={checklist} onPress={handleChecklistPress} />
            )}
          />
        </ProfileSection>

        <ProfileSection
          title={sectionsCopy.myFavorites.title}
          isEmpty={myFavorites.length === 0}
          emptyTitle={sectionsCopy.myFavorites.emptyTitle}
          emptyDescription={
            isGuest
              ? guestEmptyDescriptions.myFavorites
              : sectionsCopy.myFavorites.emptyDescription
          }
          ctaLabel={sectionsCopy.myFavorites.cta}
          onCtaPress={handleExploreFavorites}
          headerAction={
            myFavorites.length > 0 ? (
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={COPY.actions.seeAll}
                onPress={handleMyFavoritesSeeAllPress}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text variant="bodySm" color="primary">
                  {COPY.actions.seeAll}
                </Text>
              </Pressable>
            ) : undefined
          }
        >
          <HorizontalList
            data={myFavorites}
            keyExtractor={(checklist) => checklist.id}
            renderItem={(checklist) => (
              <ChecklistCard checklist={checklist} onPress={handleChecklistPress} />
            )}
          />
        </ProfileSection>

        {/* <ProfileSection
          title={sectionsCopy.myComments.title}
          isEmpty={myComments.length === 0}
          emptyTitle={sectionsCopy.myComments.emptyTitle}
          emptyDescription={
            isGuest
              ? guestEmptyDescriptions.myComments
              : sectionsCopy.myComments.emptyDescription
          }
          ctaLabel={sectionsCopy.myComments.cta}
          onCtaPress={handleExploreComments}
        >
          <View style={styles.list}>
            {myComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </View>
        </ProfileSection> */}
      </ScrollView>
    </Container>
  );
}
