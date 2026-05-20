import { useLocalSearchParams } from 'expo-router';

import { CreateScreen } from '@/modules/create/screens/create';

export default function EditChecklistRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const checklistId = typeof id === 'string' ? id : id?.[0];

  return <CreateScreen checklistId={checklistId} />;
}
