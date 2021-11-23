import { createContext } from 'react';

export interface AuthContextProps {
  isLoggedIn: boolean;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
  requestAccess: (requestToken: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  signOut: () => Promise.resolve(undefined),
  signIn: () => Promise.resolve(undefined),
  requestAccess: () => Promise.reject(),
});
