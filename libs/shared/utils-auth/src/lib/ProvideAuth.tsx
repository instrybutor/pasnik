import React, { PropsWithChildren, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UserModel } from '@pasnik/api/data-transfer';

import { AuthContext } from './authContext';
import { authFetch } from './auth-fetch.service';

function useProvideAuth() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const history = useHistory();

  const fetchUser = useCallback((): Promise<UserModel> => {
    return authFetch<UserModel>('/api/users/me').then((user) => {
      setUser(user);
      setFetching(false);
      return user;
    });
  }, []);

  const fetchUsers = useCallback((): Promise<UserModel[]> => {
    return authFetch<UserModel[]>('/api/users').then((users) => {
      setUsers(users);
      return users;
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('jwt');
    setUser(null);
    history.push('/login');
  }, [history]);

  React.useEffect(() => {
    Promise.all([fetchUsers(), fetchUser()]).catch(() => {
      setFetching(false);
    });
  }, [fetchUser, fetchUsers, history]);

  return {
    user,
    users,
    fetching,
    fetchUser,
    signOut,
  };
}

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const { fetching, ...auth } = useProvideAuth();

  if (fetching) {
    return (
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <span role="img" aria-label="food" className="text-6xl animate-bounce">
          🍔
        </span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
}
