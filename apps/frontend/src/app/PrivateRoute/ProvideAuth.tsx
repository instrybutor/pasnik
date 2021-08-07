import React, { ComponentProps, useState } from 'react';
import { authContext } from './authContext';
import { auth } from './auth';

function useProvideAuth() {
  const [jwt, setJwt] = useState<string | null>(null);

  const signin = (accessToken: string, cb: (data: any) => void) => {
    return fetch(`/api/auth/google/callback/?access_token=${accessToken}`)
      .then((res) => res.json())
      .then(({ accessToken }) => {
        setJwt(accessToken);
        cb(accessToken);
      });
  };

  const signout = (cb: () => void) => {
    return auth.signout(() => {
      setJwt(null);
      cb();
    });
  };

  return {
    jwt,
    signin,
    signout,
  };
}

export function ProvideAuth({ children }: ComponentProps<any>) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
