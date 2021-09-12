import { useEffect, useState } from 'react';
import { IUseGoogleOneTapLogin } from './types';
import { useScript } from '@pasnik/shared/utils-auth';

const scriptFlag = '__googleOneTapScript__';
const googleClientScriptURL = 'https://accounts.google.com/gsi/client';

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
  }, [script, disabled, buttonArgs, googleAccountConfigs]);

  return {
    renderButton: (...args: unknown[]) => {
      setButtonArgs(args);
    },
  };
}
