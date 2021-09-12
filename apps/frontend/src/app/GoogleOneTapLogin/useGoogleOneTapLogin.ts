import { useEffect } from 'react';
import { IUseGoogleOneTapLogin } from './types';
import { useScript } from '@pasnik/shared/utils-auth';

const scriptFlag = '__googleOneTapScript__';
const googleClientScriptURL = 'https://accounts.google.com/gsi/client';
const oauthEndpointURL = 'https://oauth2.googleapis.com/tokeninfo?id_token=';

export function useGoogleOneTapLogin({
  disabled,
  googleAccountConfigs,
}: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);

  useEffect(() => {
    if (!window?.[scriptFlag] && window.google && script === 'ready') {
      window.google.accounts.id.initialize(googleAccountConfigs);
      window[scriptFlag] = true;
    }
    if (window?.[scriptFlag] && script === 'ready' && !disabled) {
      window.google.accounts.id.prompt();
    }
  }, [script, disabled, googleAccountConfigs]);

  return null;
}
