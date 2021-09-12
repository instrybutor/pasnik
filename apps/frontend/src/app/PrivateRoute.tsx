import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { useAuth } from './utils/useAuth';

export function PrivateRoute({ children, ...rest }: React.ComponentProps<any>) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
