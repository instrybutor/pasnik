import React, { PropsWithChildren, useState } from 'react';
import { AuthContext, authContext, User } from './authContext';
import { authFetch } from './auth-fetch.service';
import ProvideGapi from './ProvideGoogleLibrary';
import { useHistory } from 'react-router-dom';

function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  const fetchUser = (): Promise<User> => {
    return authFetch<User>('/api/auth/me').then((user) => {
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
    return Promise.resolve();
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
