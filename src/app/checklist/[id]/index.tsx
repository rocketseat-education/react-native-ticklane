import { useLocalSearchParams } from 'expo-router';

import { DetailsScreen } from '@/modules/checklist/screens/details';

export default function ChecklistDetailsRoute() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ?? '';

  return <DetailsScreen id={id} />;
}
