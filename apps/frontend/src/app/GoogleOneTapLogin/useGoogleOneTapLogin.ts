import { useEffect } from 'react';
import { IUseGoogleOneTapLogin, IGoogleCallbackResponse } from './types';
import { useScript } from '../utils/useScripts';

const scriptFlag: string = '__googleOneTapScript__';
const googleClientScriptURL: string = 'https://accounts.google.com/gsi/client';
const oauthEndpointURL: string =
  'https://oauth2.googleapis.com/tokeninfo?id_token=';

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
  }, [script, window?.[scriptFlag], disabled]);

  return null;
}
