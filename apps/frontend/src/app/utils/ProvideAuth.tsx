import React, { ComponentProps, useState } from 'react';
import { AuthContext, authContext, User } from './authContext';
import { authFetch } from './authFetch';
import ProvideGapi, { useGoogleLibrary } from './ProvideGoogleLibrary';

function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<User | null>(null);
  const gapi = useGoogleLibrary();

  const fetchUser = (): Promise<User> => {
    return authFetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized')
        }
        return res.json();
      })
      .then((user: User) => {
        setUser(user);
        return user;
      })
  }

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
      });
  };

  const signOut = () => {
    gapi.revoke();
    // useGoogleLogout({
    //   clientId: process.env.NX_GOOGLE_CLIENT_ID!,
    //   onLogoutSuccess: () => {
    //     localStorage.removeItem('jwt');
    //     window.location.href = '/login';
    //   }
    // });
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    signIn,
    signOut,
  };
}

export function ProvideAuth({ children }: ComponentProps<any>) {
  const auth = useProvideAuth();
  return (
    <ProvideGapi>
      <authContext.Provider value={auth}>{children}</authContext.Provider>
    </ProvideGapi>
  );
}

