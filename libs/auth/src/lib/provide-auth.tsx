import { PropsWithChildren } from 'react';

import { AuthContext } from './auth-context';
import { useAuthFacade } from './auth.facade';
import { FullscreenSpinner } from '@pasnik/components';

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const { fetching, ...auth } = useAuthFacade();

  if (fetching) {
    return <FullscreenSpinner />;
  }

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
}
