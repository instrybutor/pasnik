import { createContext } from 'react';

export const authContext = createContext<{
  jwt: string | null;
  signin: (accessToken: string, cb: (data: any) => void) => void;
  signout: (cb: () => void) => void;
}>({
  signin: (accessToken, cb) => {},
  signout: () => {
    return;
  },
  jwt: null,
});
