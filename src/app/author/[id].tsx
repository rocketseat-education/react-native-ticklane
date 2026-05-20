import { useLocalSearchParams } from 'expo-router';

import { AuthorScreen } from '@/modules/author/screens/author';

export default function AuthorRoute() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ?? '';

  return <AuthorScreen id={id} />;
}
