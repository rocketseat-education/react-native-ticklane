import { createContext } from 'react';

import type { User } from '@/types';

export type AuthStatus = 'loading' | 'guest' | 'authenticated';

export type EmailOtpResult = { ok: true } | { ok: false; error: string };
export type EmailOtpVerifyResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

/**
 * Contexto da autenticação no app móvel.
 *
 * O backend mantém a sessão por cookie HttpOnly (`/api/auth/me`, `/api/auth/otp/*`,
 * `/api/auth/logout`). Quando ainda não há sessão real, expomos um utilizador
 * “convidado” sintético para que o resto da app possa continuar a renderizar
 * (ex.: ver listas públicas) — `isGuest` indica esse caso.
 */
export type AuthContextValue = {
  /** Utilizador efectivo (ou convidado sintético quando não há sessão). */
  currentUser: User;
  /** Loading inicial enquanto resolvemos /api/auth/me; depois 'guest' ou 'authenticated'. */
  status: AuthStatus;
  isGuest: boolean;
  isAuthenticated: boolean;
  /** true depois de /api/auth/me responder (sucesso ou anónimo). */
  authResolved: boolean;
  /** Pede o envio de um código OTP por e-mail. */
  requestEmailLoginCode: (email: string) => Promise<EmailOtpResult>;
  /** Confirma o código OTP recebido. Em sucesso, actualiza a sessão local. */
  verifyEmailLoginCode: (email: string, code: string) => Promise<EmailOtpVerifyResult>;
  /** Substitui o utilizador autenticado (depois de actualizar perfil/avatar). */
  applySessionUser: (user: User) => void;
  signOut: () => Promise<void>;
  /** Devolve o utilizador mais recente (para callbacks sem rerender). */
  getLatestUser: () => User;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const GUEST_USER_ID = 'guest';

export function buildGuestUser(): User {
  return {
    id: GUEST_USER_ID,
    username: 'visitante',
    displayName: 'Visitante',
    initials: 'VS',
    isGuest: true,
  };
}
