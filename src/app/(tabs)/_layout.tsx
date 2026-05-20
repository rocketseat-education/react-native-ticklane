import { Tabs, useRouter } from 'expo-router';

import { TabBarCreateIcon, TabBarIcon } from '@/components/tab-bar-icon';
import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { useRequireAuth } from '@/modules/auth/gate';
import { useTheme } from '@/theme/use-theme';

export default function TabsLayout() {
  const { theme } = useTheme();
  const router = useRouter();
  const requireAuth = useRequireAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSubtle,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: theme.sizes.borderHairline,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.family.sans,
          fontSize: theme.typography.variants.caption.fontSize,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: COPY.tabs.home,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: COPY.tabs.search,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="compose"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            void (async () => {
              const ok = await requireAuth('create');
              if (ok) {
                router.push(ROUTES.create);
              }
            })();
          },
        }}
        options={{
          title: COPY.tabs.create,
          tabBarIcon: ({ color }) => <TabBarCreateIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: COPY.tabs.favorites,
          tabBarIcon: ({ color }) => <TabBarIcon name="bookmark" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: COPY.tabs.profile,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
