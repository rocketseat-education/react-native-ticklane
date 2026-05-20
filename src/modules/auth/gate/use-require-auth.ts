import { useCallback } from 'react';

import { useAuth } from '../context/use-auth';
import type { AuthIntent } from '../types';
import { useAuthGateState } from './use-auth-gate-state';

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const { show } = useAuthGateState();

  const requireAuth = useCallback(
    async (intent: AuthIntent) => {
      if (isAuthenticated) {
        return true;
      }

      return show(intent);
    },
    [isAuthenticated, show],
  );

  return requireAuth;
}
