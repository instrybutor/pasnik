import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './auth-context';

export function useAuth() {
  return useContext<AuthContextProps>(AuthContext);
}
