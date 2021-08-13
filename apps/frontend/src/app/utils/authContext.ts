import { createContext } from 'react';

export interface User {
  email: string;
}

export interface AuthContext {
  user: User | null;
  signIn: (accessToken: string) => Promise<User>;
  signOut: () => void;
}

export const authContext = createContext({} as AuthContext);
