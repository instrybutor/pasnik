import { PropsWithChildren } from 'react';

import { AuthContext } from './auth-context';
import { useAuthFacade } from './auth.facade';

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const { fetching, ...auth } = useAuthFacade();

  if (fetching) {
    return (
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <span role="img" aria-label="food" className="text-6xl animate-bounce">
          🍔
        </span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  );
}
