import { FunctionComponent, memo, useEffect, useRef } from 'react';

import { useGoogleLibrary } from '@pasnik/shared/utils-auth';

import { IUseGoogleOneTapLogin } from './types';

export interface GoogleButtonLoginProps extends IUseGoogleOneTapLogin {
  className?: string;
}

export const GoogleButtonLogin: FunctionComponent<GoogleButtonLoginProps> =
  memo(({ children = null, className, ...props }) => {
    const ref = useRef(null);
    const gapi = useGoogleLibrary();

    useEffect(() => {
      gapi.initialize(props.googleAccountConfigs);
      gapi.renderButton(ref.current!, {
        theme: 'filled_black',
        size: 'large',
        text: 'continue_with',
        shape: 'pill',
      });
    }, []);

    return <div className={className} ref={ref} />;
  });
