import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

import { COPY } from '@/constants/copy';
import { ROUTES } from '@/constants/routes';
import { formatOfflineExecutionUpdatedAt } from '@/lib/offlineExecution';
import { useOfflineExecutions } from '@/modules/execution/hooks/use-offline-executions';
import { useTheme } from '@/theme/use-theme';
import type { OfflineExecutionSummary } from '@/types';

import { createStyles } from './running-executions-screen.styles';

export function useRunningExecutionsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const screenCopy = COPY.screens.runningExecutionsList;
  const sectionsCopy = COPY.screens.profile.sections.runningExecutions;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { executions } = useOfflineExecutions();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleExecutionPress = useCallback(
    (execution: OfflineExecutionSummary) => {
      router.push(ROUTES.execution(execution.id));
    },
    [router],
  );

  const handleExploreHome = useCallback(() => {
    router.push(ROUTES.tabs.home);
  }, [router]);

  const progressOf = sectionsCopy.progressOf;

  return {
    styles,
    screenCopy,
    executions,
    progressOf,
    formatRunningExecutionDate: formatOfflineExecutionUpdatedAt,
    handleBack,
    handleExecutionPress,
    handleExploreHome,
  };
}
