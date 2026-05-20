import { useLocalSearchParams } from 'expo-router';

import { ItemDetailsScreen } from '@/modules/checklist/screens/item-details';

export default function ItemDetailsRoute() {
  const params = useLocalSearchParams<{ id: string; itemId: string }>();
  const checklistId = params.id ?? '';
  const itemId = params.itemId ?? '';

  return <ItemDetailsScreen checklistId={checklistId} itemId={itemId} />;
}
