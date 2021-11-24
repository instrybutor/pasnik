import React, { useCallback, useState } from 'react';
import { UserModel } from '@pasnik/api/data-transfer';
import { useNavigate } from 'react-router-dom';
import axios from '@pasnik/axios';

export function useAuthFacade() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [users, setUsers] = useState<UserModel[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchUser = useCallback((): Promise<UserModel> => {
    return axios.get<UserModel>('/auth/me').then(({ data }) => {
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

  const signOut = useCallback(async () => {
    await axios.post('/auth/logout');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const requestAccess = useCallback((requestToken) => {
    return axios
      .post('/auth/request-access', { requestToken })
      .then(() => undefined);
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
    fetchUser,
    requestAccess,
    signOut,
  };
}
