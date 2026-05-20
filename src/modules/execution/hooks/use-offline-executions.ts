import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import { listOfflineExecutions } from '@/lib/offlineExecution';
import type { OfflineExecutionSummary } from '@/types';

export function useOfflineExecutions() {
  const [executions, setExecutions] = useState<OfflineExecutionSummary[]>([]);

  const refresh = useCallback(async () => {
    const next = await listOfflineExecutions();

    setExecutions(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return { executions, refresh };
}
