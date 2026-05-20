import { useLocalSearchParams } from 'expo-router';

import { ExecutionScreen } from '@/modules/execution/screens/execution';

export default function ExecutionRoute() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id ?? '';

  return <ExecutionScreen id={id} />;
}
