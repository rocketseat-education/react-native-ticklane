export type AuthProviderId = 'email';

export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  initials?: string;
  bio?: string;
  isGuest?: boolean;
  authProvider?: AuthProviderId;
  email?: string;
};
