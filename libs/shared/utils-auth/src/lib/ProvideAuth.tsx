import React, { PropsWithChildren, useState } from 'react';
import { AuthContext, authContext } from './authContext';
import { authFetch } from './auth-fetch.service';
import ProvideGapi from './ProvideGoogleLibrary';
import { useHistory } from 'react-router-dom';
import { UserModel } from '@pasnik/api/data-transfer';

function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<UserModel | null>(null);
  const history = useHistory();

  const fetchUser = (): Promise<UserModel> => {
    return authFetch<UserModel>('/api/auth/me').then((user) => {
      setUser(user);
      return user;
    });
  };

  const signIn = (accessToken: string) => {
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
      .catch(() => {
        history.push('/login');
      });
  };

  const signOut = () => {
    localStorage.removeItem('jwt');
    setUser(null);
    history.push('/login');
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fetchUser().catch(() => {});
  }, []);

  return {
    user,
    signIn,
    signOut,
  };
}

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const auth = useProvideAuth();
  return (
    <ProvideGapi>
      <authContext.Provider value={auth}>{children}</authContext.Provider>
    </ProvideGapi>
  );
}
