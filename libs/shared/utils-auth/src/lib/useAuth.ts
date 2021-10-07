import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './authContext';

export function useAuth() {
  return useContext<AuthContextProps>(AuthContext);
}
