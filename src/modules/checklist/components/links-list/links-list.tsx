import { Feather } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/text';
import type { ChecklistLink, ItemLink } from '@/types';

import { useLinksList } from './use-links-list';

export type LinksListProps = {
  links: Array<ChecklistLink | ItemLink>;
};

export function LinksList({ links }: LinksListProps) {
  const { styles, iconSize, iconColor, handleOpenLink } = useLinksList();

  if (!links.length) {
    return null;
  }

  return (
    <View style={styles.root}>
      {links.map((link) => (
        <Pressable key={link.id} onPress={() => handleOpenLink(link.url)} style={styles.item}>
          <Feather name="external-link" size={iconSize} color={iconColor} />
          <Text variant="bodySm" color="primary">
            {link.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
