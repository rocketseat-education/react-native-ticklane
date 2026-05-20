import { Fragment } from 'react';
import { View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Text } from '@/components/text';
import type { User } from '@/types';

import { useAuthorHeader } from './use-author-header';

export type AuthorStat = {
  label: string;
  value: string | number;
};

export type AuthorHeaderProps = {
  user: User;
  stats: AuthorStat[];
};

export function AuthorHeader({ user, stats }: AuthorHeaderProps) {
  const { styles, username } = useAuthorHeader({ user });

  return (
    <View style={styles.root}>
      <Avatar size="xl" name={user.displayName} initials={user.initials} imageUrl={user.avatarUrl} />

      <View style={styles.identity}>
        <Text variant="h1" align="center">
          {user.displayName}
        </Text>
        <Text variant="bodySm" color="textMuted" align="center">
          {username}
        </Text>
      </View>

      {user.bio ? (
        <Text variant="body" color="textMuted" align="center">
          {user.bio}
        </Text>
      ) : null}

      {stats.length ? (
        <View style={styles.stats}>
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 ? <View style={styles.statDivider} /> : null}
              <View style={styles.statItem}>
                <Text variant="h3" align="center">
                  {stat.value}
                </Text>
                <Text variant="caption" color="textMuted" align="center">
                  {stat.label}
                </Text>
              </View>
            </Fragment>
          ))}
        </View>
      ) : null}
    </View>
  );
}
