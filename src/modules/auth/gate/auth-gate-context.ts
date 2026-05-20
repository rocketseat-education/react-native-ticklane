import { createContext } from 'react';

import type { AuthIntent } from '../types';

export type AuthGateContextValue = {
  isVisible: boolean;
  intent: AuthIntent | null;
  show: (intent: AuthIntent) => Promise<boolean>;
  hide: () => void;
  resolve: (didAuthenticate: boolean) => void;
};

export const AuthGateContext = createContext<AuthGateContextValue | null>(null);
