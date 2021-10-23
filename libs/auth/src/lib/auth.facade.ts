import React, { useCallback, useState } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';
import { useHistory } from 'react-router-dom';
import axios, { clearAuthToken } from '@pasnik/axios';

export function useAuthFacade() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const history = useHistory();

  const fetchUser = useCallback((): Promise<UserModel> => {
    return axios.get<UserModel>('/api/users/me').then(({ data }) => {
      setUser(data);
      setFetching(false);
      return data;
    });
  }, []);

  const fetchUsers = useCallback((): Promise<UserModel[]> => {
    return axios.get<UserModel[]>('/api/users').then(({ data }) => {
      setUsers(data);
      return data;
    });
  }, []);

  const signOut = useCallback(() => {
    clearAuthToken();
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
