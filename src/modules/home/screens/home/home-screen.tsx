import { ScrollView, View } from 'react-native';

import { Container } from '@/components/container';
import { HorizontalList } from '@/components/horizontal-list';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ChecklistCard, ChecklistListItem } from '@/modules/checklist/components';

import { useHomeScreen } from './use-home-screen';

export function HomeScreen() {
  const {
    styles,
    title,
    subtitle,
    popularTitle,
    trendingTitle,
    recentTitle,
    popularChecklists,
    trendingChecklists,
    recentChecklists,
    handleChecklistPress,
  } = useHomeScreen();

  return (
    <Container paddingVertical="none">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ScreenHeader title={title} subtitle={subtitle} />

        <View style={styles.section}>
          <SectionHeader title={popularTitle} />
          <HorizontalList
            data={popularChecklists}
            keyExtractor={(checklist) => checklist.id}
            renderItem={(checklist) => (
              <ChecklistCard checklist={checklist} onPress={handleChecklistPress} />
            )}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title={trendingTitle} />
          <HorizontalList
            data={trendingChecklists}
            keyExtractor={(checklist) => checklist.id}
            renderItem={(checklist) => (
              <ChecklistCard checklist={checklist} onPress={handleChecklistPress} />
            )}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title={recentTitle} />
          <View style={styles.list}>
            {recentChecklists.map((checklist) => (
              <ChecklistListItem
                key={checklist.id}
                checklist={checklist}
                onPress={handleChecklistPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
