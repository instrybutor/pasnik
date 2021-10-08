import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import { UserModel } from '@pasnik/api/data-transfer';

import { AuthContext } from './authContext';
import { authFetch } from './auth-fetch.service';
import { useGoogleLibLoader } from './useGoogleLibLoader';

function useProvideAuth() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const history = useHistory();

  const fetchUser = useCallback((): Promise<UserModel> => {
    setFetching(true);

    return authFetch<UserModel>('/api/auth/me').then((user) => {
      setUser(user);
      setFetching(false);
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
    fetchUser().catch(() => {
      setFetching(false);
    });
  }, [fetchUser]);

  return {
    user,
    fetching,
    signIn,
    signOut,
  };
}

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const { fetching, ...auth } = useProvideAuth();
  const { pending, gapi } = useGoogleLibLoader();

  const isAppLoaded = useMemo(
    () => [pending, fetching].every((flag) => !flag),
    [fetching, pending]
  );

  if (!isAppLoaded) {
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
