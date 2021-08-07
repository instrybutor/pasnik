import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import { useAuth } from './useAuth';

export function PrivateRoute({ children, ...rest }: React.ComponentProps<any>) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.jwt ? (
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
