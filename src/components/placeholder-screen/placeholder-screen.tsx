import { Feather } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { ScreenHeader } from '@/components/screen-header';
import { COPY } from '@/constants/copy';

import { usePlaceholderScreen } from './use-placeholder-screen';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

export type PlaceholderScreenProps = {
  title: string;
  subtitle?: string;
  iconName?: FeatherIconName;
  bodyTitle?: string;
  bodyDescription?: string;
  headerLeftSlot?: ReactNode;
  headerRightSlot?: ReactNode;
  bodyAction?: ReactNode;
};

export function PlaceholderScreen({
  title,
  subtitle,
  iconName = 'package',
  bodyTitle = COPY.states.placeholderTitle,
  bodyDescription = COPY.states.placeholderDescription,
  headerLeftSlot,
  headerRightSlot,
  bodyAction,
}: PlaceholderScreenProps) {
  const { styles } = usePlaceholderScreen();

  return (
    <Container>
      <ScreenHeader
        title={title}
        subtitle={subtitle}
        leftSlot={headerLeftSlot}
        rightSlot={headerRightSlot}
      />
      <View style={styles.content}>
        <EmptyState
          title={bodyTitle}
          description={bodyDescription}
          renderIcon={({ size, color }) => <Feather name={iconName} size={size} color={color} />}
          action={bodyAction}
        />
      </View>
    </Container>
  );
}
