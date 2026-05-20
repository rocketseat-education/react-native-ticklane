import { View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { Text } from '@/components/text';
import type { User } from '@/types';

import { useProfileHeader } from './use-profile-header';

export type ProfileHeaderProps = {
  user: User;
  guestBadgeLabel: string;
  connectLabel: string;
  logoutLabel: string;
  editLabel: string;
  onConnectPress: () => void;
  onLogoutPress: () => void;
  onEditPress: () => void;
};

export function ProfileHeader({
  user,
  guestBadgeLabel,
  connectLabel,
  logoutLabel,
  editLabel,
  onConnectPress,
  onLogoutPress,
  onEditPress,
}: ProfileHeaderProps) {
  const { styles, isGuest, displayName, displaySubtitle } = useProfileHeader({ user });

  return (
    <View style={styles.root}>
      <Avatar
        size="xl"
        name={user.displayName}
        initials={user.initials}
        imageUrl={isGuest ? undefined : user.avatarUrl}
      />

      <View style={styles.identity}>
        <View style={styles.nameRow}>
          <Text variant="h1">{displayName}</Text>
          {isGuest ? <Badge>{guestBadgeLabel}</Badge> : null}
        </View>
        {displaySubtitle ? (
          <Text variant="bodySm" color="textMuted">
            {displaySubtitle}
          </Text>
        ) : null}
        {!isGuest && user.bio ? (
          <Text variant="bodySm" color="textMuted" align="center">
            {user.bio}
          </Text>
        ) : null}
      </View>

      {isGuest ? (
        <Button
          variant="primary"
          size="md"
          isFullWidth
          label={connectLabel}
          onPress={onConnectPress}
        />
      ) : (
        <View style={styles.actions}>
          <Button variant="secondary" size="md" label={editLabel} onPress={onEditPress} />
          <Button variant="ghost" size="md" label={logoutLabel} onPress={onLogoutPress} />
        </View>
      )}
    </View>
  );
}
