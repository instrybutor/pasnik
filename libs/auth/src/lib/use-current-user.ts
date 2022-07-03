import { useContext } from 'react';
import { UserContext } from './user-context';

export function useCurrentUser() {
  return useContext(UserContext);
}
