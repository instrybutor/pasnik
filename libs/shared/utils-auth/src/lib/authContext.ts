import { createContext } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';

export interface AuthContext {
  user: UserModel | null;
  signIn: (accessToken: string) => Promise<UserModel | void>;
  signOut: () => void;
}

export const authContext = createContext({} as AuthContext);
