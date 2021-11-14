import { createContext } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';

export interface AuthContextProps {
  user: UserModel | null;
  users: UserModel[];
  fetchUser: () => Promise<UserModel>;
  signOut: () => void;
  requestAccess: (requestToken: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  users: [],
  fetchUser: () => Promise.reject(),
  signOut: () => undefined,
  requestAccess: () => Promise.reject(),
});
