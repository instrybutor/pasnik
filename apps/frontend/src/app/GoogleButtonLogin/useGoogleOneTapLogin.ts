import { useEffect, useState } from 'react';
import { IUseGoogleOneTapLogin, IGoogleCallbackResponse } from './types';
import { useScript } from '../utils/useScripts';

const scriptFlag: string = '__googleOneTapScript__';
const googleClientScriptURL: string = 'https://accounts.google.com/gsi/client';
const oauthEndpointURL: string =
  'https://oauth2.googleapis.com/tokeninfo?id_token=';

export function useGoogleButtonLogin({
  disabled,
  googleAccountConfigs,
}: IUseGoogleOneTapLogin) {
  const script = useScript(googleClientScriptURL);
  const [buttonArgs, setButtonArgs] = useState<unknown[] | null>(null);

  useEffect(() => {
    if (!window?.[scriptFlag] && window.google && script === 'ready') {
      window.google.accounts.id.initialize(googleAccountConfigs);
      window[scriptFlag] = true;
    }
    if (window?.[scriptFlag] && script === 'ready' && buttonArgs) {
      window.google.accounts.id.renderButton.apply(null, buttonArgs);
    }
  }, [script, window?.[scriptFlag], disabled, buttonArgs]);

  return {
    renderButton: (...args: unknown[]) => {
      setButtonArgs(args);
    },
  };
}
