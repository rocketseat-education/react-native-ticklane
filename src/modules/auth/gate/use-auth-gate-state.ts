import { useContext } from 'react';

import { AuthGateContext } from './auth-gate-context';

export function useAuthGateState() {
  const context = useContext(AuthGateContext);

  if (!context) {
    throw new Error('useAuthGateState must be used within an AuthGateProvider');
  }

  return context;
}
