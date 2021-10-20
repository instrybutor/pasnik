import { createContext } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';

export interface AuthContextProps {
  user: UserModel | null;
  users: UserModel[];
  signIn: (accessToken: string) => Promise<UserModel | void>;
  signOut: () => void;
  requestAccess: () => void;
  gapi?: google.accounts.id;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  users: [],
  signIn: () => Promise.reject(),
  signOut: () => undefined,
  requestAccess: () => Promise.reject(),
  gapi: {
    initialize: () => undefined,
    renderButton: () => undefined,
    revoke: () => undefined,
  },
});
