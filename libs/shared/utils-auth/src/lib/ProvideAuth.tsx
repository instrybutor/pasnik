import React, { PropsWithChildren, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UserModel } from '@pasnik/api/data-transfer';

import { AuthContext } from './authContext';
import { authFetch } from './auth-fetch.service';
import { useGoogleLibLoader } from './useGoogleLibLoader';

function useProvideAuth() {
  const [user, setUser] = useState<UserModel | null>(null);
  const history = useHistory();

  const fetchUser = useCallback((): Promise<UserModel> => {
    return authFetch<UserModel>('/api/auth/me').then((user) => {
      setUser(user);
      return user;
    });
  }, []);

  const signIn = useCallback(
    (accessToken: string) => {
      return fetch(`/api/auth/google?access_token=${accessToken}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          return res.json();
        })
        .then(({ accessToken }) => {
          localStorage.setItem('jwt', accessToken);
          return fetchUser();
        })
        .catch(() => history.push('/login'));
    },
    [fetchUser, history]
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('jwt');
    setUser(null);
    history.push('/login');
  }, [history]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fetchUser().catch(() => {});
  }, [fetchUser]);

  return {
    user,
    signIn,
    signOut,
  };
}

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const auth = useProvideAuth();
  const { pending, gapi } = useGoogleLibLoader();

  if (pending && !gapi) {
    return (
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <span role="img" aria-label="food" className="text-6xl animate-bounce">
          🍔
        </span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ ...auth, gapi }}>
      {children}
    </AuthContext.Provider>
  );
}
