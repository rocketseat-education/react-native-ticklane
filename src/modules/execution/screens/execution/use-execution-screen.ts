import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { COPY } from '@/constants/copy';
import {
  getOfflineExecutionWithItems,
  setOfflineExecutionItemChecked,
} from '@/lib/offlineExecution';
import { useTheme } from '@/theme/use-theme';
import type { OfflineExecutionDetail, OfflineExecutionItemRow } from '@/types';

import { createStyles } from './execution-screen.styles';

export type UseExecutionScreenParams = {
  id: string;
};

export function useExecutionScreen({ id }: UseExecutionScreenParams) {
  const router = useRouter();
  const { theme } = useTheme();
  const screenCopy = COPY.screens.execution;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [detail, setDetail] = useState<OfflineExecutionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
    }

    const next = await getOfflineExecutionWithItems(id);

    setDetail(next);

    if (!silent) {
      setIsLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      void load(false);
    }, [load]),
  );

  const doneCount = useMemo(
    () => (detail ? detail.items.filter((item) => item.checked).length : 0),
    [detail],
  );

  const totalCount = detail?.items.length ?? 0;

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleToggleItem = useCallback(
    async (item: OfflineExecutionItemRow, next: boolean) => {
      await setOfflineExecutionItemChecked(id, item.id, next);
      await load(true);
    },
    [id, load],
  );

  return {
    styles,
    screenCopy,
    detail,
    isLoading,
    isNotFound: !isLoading && detail === null,
    doneCount,
    totalCount,
    handleBack,
    handleToggleItem,
  };
}
