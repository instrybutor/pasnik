import { PropsWithChildren } from 'react';

import { AuthContext } from './auth-context';
import { useAuthFacade } from './auth.facade';
import { UserState, useUserStore } from '@pasnik/store';
import { getError, LoadingState } from '@pasnik/shared/utils';

const errorSelector = (state: UserState) => getError(state.userCallState);

export function ProvideAuth({ children }: PropsWithChildren<unknown>) {
  const auth = useAuthFacade();
  const { userCallState } = useUserStore();
  const error = useUserStore(errorSelector);

  if (error) {
    return (
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        {error}
      </div>
    );
  } else if (userCallState !== LoadingState.LOADED) {
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
