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
  const [users, setUsers] = useState<UserModel[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const history = useHistory();

  const fetchUser = useCallback((): Promise<UserModel> => {
    setFetching(true);

    return authFetch<UserModel>('/api/users/me').then((user) => {
      setUser(user);
      setFetching(false);
      return user;
    });
  }, []);

  const fetchUsers = useCallback((): Promise<UserModel[]> => {
    setFetching(true);

    return authFetch<UserModel[]>('/api/users').then((users) => {
      setUsers(users);
      setFetching(false);
      return users;
    });
  }, []);

  const signIn = useCallback(
    (accessToken: string) => {
      return fetch(`/api/auth/google?access_token=${accessToken}`)
        .then((res) => {
          if (res.status === 403) {
            return res.json(); // invitation required
          }

          if (!res.ok) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }

          return res.json();
        })
        .then(({ accessToken, requestToken }) => {
          if (requestToken) {
            history.push({
              pathname: '/request-access',
              state: {
                requestToken,
              },
            });
            return;
          }
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

  const requestAccess = useCallback(() => {
    fetch('/api/auth/request-access', {});
  }, []);

  React.useEffect(() => {
    Promise.all([fetchUsers(), fetchUser()]).catch(() => {
      setFetching(false);
    });
  }, [fetchUser, fetchUsers]);

  return {
    user,
    users,
    fetching,
    signIn,
    signOut,
    requestAccess,
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
