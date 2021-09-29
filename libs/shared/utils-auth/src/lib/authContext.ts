import { createContext } from 'react';

export interface User {
  email: string;
  id: number;
  googleId: string;
}

export interface AuthContext {
  user: User | null;
  signIn: (accessToken: string) => Promise<User | void>;
  signOut: () => void;
}

export const authContext = createContext({} as AuthContext);
