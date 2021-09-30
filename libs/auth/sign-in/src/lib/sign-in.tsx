import { useCallback, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '@pasnik/shared/utils-auth';

import { GoogleButtonLogin } from './components/google-button-login';
import {
  IGoogleCallbackResponse,
  IGoogleOneTapLoginProps,
} from './components/google-one-tap-login';

export const SignIn: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();

  const onSuccess = useCallback(
    ({ credential }: IGoogleCallbackResponse) => {
      if (credential) {
        auth.signIn(credential).then(() => {
          history.push('/');
        });
      }
    },
    [auth, history]
  );

  const config: IGoogleOneTapLoginProps = useMemo(
    () =>
      ({
        client_id: process.env.NX_GOOGLE_CLIENT_ID,
        cancel_on_tap_outside: false,
        callback: onSuccess,
      } as IGoogleOneTapLoginProps),
    [onSuccess]
  );

  return (
    <div className="flex w-screen min-h-screen items-center justify-center">
      <div className="flex flex-col text-center gap-4">
        <h1 className="text-4xl">
          <span role="img" aria-label="food">
            🍔
          </span>{' '}
          Paśnik
        </h1>
        <GoogleButtonLogin googleAccountConfigs={config} />
      </div>
    </div>
  );
};
