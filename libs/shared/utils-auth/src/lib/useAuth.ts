import { useContext } from 'react';
import { authContext } from './authContext';

export function useAuth() {
  return useContext(authContext);
}
