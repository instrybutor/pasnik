import { useEffect } from 'react';

import { useScript } from '@pasnik/shared/utils-auth';

import { IUseGoogleOneTapLogin } from './types';

const scriptFlag = '__googleOneTapScript__';
const googleClientScriptURL = 'https://accounts.google.com/gsi/client';

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
