import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@pasnik/axios';
import { useUserStore } from '@pasnik/store';
import { useWorkspaceStore } from '@pasnik/features/workspaces';

export function useAuthFacade() {
  const navigate = useNavigate();
  const { fetchUsers, fetchMe, resetState } = useUserStore();
  const isLoggedIn = useUserStore(({ user }) => !!user);
  const user = useUserStore(({ user }) => user);
  const { fetchWorkspaces, resetState: resetWorkspaceState } =
    useWorkspaceStore();

  const signIn = useCallback(() => {
    return fetchMe()
      .then(fetchUsers)
      .then(() => undefined);
  }, [fetchUsers, fetchMe]);

  useEffect(() => {
    if (user?.id) {
      fetchWorkspaces();
    } else {
      resetWorkspaceState();
    }
  }, [fetchWorkspaces, resetWorkspaceState, user?.id]);

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
