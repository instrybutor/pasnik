import { FunctionComponent, useEffect, useRef } from 'react';
import { IUseGoogleOneTapLogin } from './types';
import { useGoogleLibrary } from '@pasnik/shared/utils-auth';

export interface GoogleButtonLoginProps extends IUseGoogleOneTapLogin {
  className?: string;
}

const GoogleButtonLogin: FunctionComponent<GoogleButtonLoginProps> = ({
  children = null,
  className,
  ...props
}) => {
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
};

export { GoogleButtonLogin };
