import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { AuthGate } from '../components/auth-gate';
import type { AuthIntent } from '../types';
import { AuthGateContext, type AuthGateContextValue } from './auth-gate-context';

type AuthGateProviderProps = {
  children: ReactNode;
};

export function AuthGateProvider({ children }: AuthGateProviderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [intent, setIntent] = useState<AuthIntent | null>(null);
  const resolverRef = useRef<((didAuthenticate: boolean) => void) | null>(null);

  const settle = useCallback((didAuthenticate: boolean) => {
    resolverRef.current?.(didAuthenticate);
    resolverRef.current = null;
    setIsVisible(false);
    setIntent(null);
  }, []);

  const show = useCallback(
    (nextIntent: AuthIntent) =>
      new Promise<boolean>((resolvePromise) => {
        resolverRef.current?.(false);
        resolverRef.current = resolvePromise;
        setIntent(nextIntent);
        setIsVisible(true);
      }),
    [],
  );

  const hide = useCallback(() => {
    settle(false);
  }, [settle]);

  const resolve = useCallback(
    (didAuthenticate: boolean) => {
      settle(didAuthenticate);
    },
    [settle],
  );

  const value = useMemo<AuthGateContextValue>(
    () => ({ isVisible, intent, show, hide, resolve }),
    [isVisible, intent, show, hide, resolve],
  );

  return (
    <AuthGateContext.Provider value={value}>
      {children}
      <AuthGate />
    </AuthGateContext.Provider>
  );
}
