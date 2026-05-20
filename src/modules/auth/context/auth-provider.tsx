import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { fetchAuthMe } from '@/lib/fetchAuthMe';
import { requestEmailOtp } from '@/lib/requestEmailOtp';
import { signOutApi } from '@/lib/signOutApi';
import { verifyEmailOtp } from '@/lib/verifyEmailOtp';
import type { User } from '@/types';

import {
  AuthContext,
  type AuthContextValue,
  buildGuestUser,
} from './auth-context';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const guestUser = useMemo(() => buildGuestUser(), []);
  const [sessionUser, setSessionUser] = useState<User | null | undefined>(undefined);
  const currentUserRef = useRef<User>(guestUser);

  useEffect(() => {
    const controller = new AbortController();
    fetchAuthMe(controller.signal)
      .then((user) => {
        setSessionUser(user);
      })
      .catch(() => {
        setSessionUser(null);
      });
    return () => controller.abort();
  }, []);

  const currentUser = sessionUser ?? guestUser;

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const requestEmailLoginCode = useCallback(async (email: string) => {
    return requestEmailOtp(email);
  }, []);

  const verifyEmailLoginCode = useCallback(async (email: string, code: string) => {
    const result = await verifyEmailOtp(email, code);
    if (result.ok) {
      setSessionUser(result.user);
    }
    return result;
  }, []);

  const applySessionUser = useCallback((user: User) => {
    setSessionUser(user);
  }, []);

  const signOut = useCallback(async () => {
    await signOutApi();
    setSessionUser(null);
  }, []);

  const getLatestUser = useCallback(() => currentUserRef.current, []);

  const value = useMemo<AuthContextValue>(() => {
    const resolved = sessionUser !== undefined;
    const isAuthenticated = Boolean(sessionUser);
    const status = !resolved ? 'loading' : isAuthenticated ? 'authenticated' : 'guest';

    return {
      currentUser,
      status,
      isGuest: !isAuthenticated,
      isAuthenticated,
      authResolved: resolved,
      requestEmailLoginCode,
      verifyEmailLoginCode,
      applySessionUser,
      signOut,
      getLatestUser,
    };
  }, [
    sessionUser,
    currentUser,
    requestEmailLoginCode,
    verifyEmailLoginCode,
    applySessionUser,
    signOut,
    getLatestUser,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
