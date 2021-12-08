import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@pasnik/axios';
import { useUserStore } from '@pasnik/store';

export function useAuthFacade() {
  const navigate = useNavigate();
  const { fetchUsers, fetchMe, resetState } = useUserStore();
  const isLoggedIn = useUserStore(({ user }) => !!user);

  const signIn = useCallback(() => {
    return fetchMe()
      .then(fetchUsers)
      .then(() => undefined);
  }, [fetchUsers, fetchMe]);

  const signOut = useCallback(async () => {
    await axios.post('/auth/logout');
    resetState();
    navigate('/login');
  }, [navigate, resetState]);

  const requestAccess = useCallback((requestToken) => {
    return axios
      .post('/auth/request-access', { requestToken })
      .then(() => undefined);
  }, []);

  React.useEffect(() => {
    signIn().catch(() => {
      // redirect to login is made in axios interceptor
    });
  }, [signIn]);

  return {
    requestAccess,
    signOut,
    signIn,
    isLoggedIn,
  };
}
