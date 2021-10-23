import { useCallback } from 'react';
import { useGoogleLogin } from './google-login.hook';
import { GoogleButtonLogin } from './google-button-login.component';

export interface GoogleLoginProps {
  onSuccess: (jwt: string) => void;
  onError: (response: Response) => void;
}

export const GoogleLogin = ({ onSuccess, onError }: GoogleLoginProps) => {
  const { signInUsingGoogle } = useGoogleLogin();

  const googleSuccess = useCallback(
    ({ credential }: google.accounts.IGoogleCallbackResponse) => {
      signInUsingGoogle(credential).then(onSuccess).catch(onError);
    },
    [signInUsingGoogle, onSuccess, onError]
  );

  const config: google.accounts.IGoogleOneTapLoginProps = {
    client_id: process.env.NX_GOOGLE_CLIENT_ID,
    cancel_on_tap_outside: false,
    callback: googleSuccess,
  } as google.accounts.IGoogleOneTapLoginProps;

  return <GoogleButtonLogin googleAccountConfigs={config} />;
};
