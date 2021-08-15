import { FunctionComponent, useEffect, useRef } from 'react';
import { IUseGoogleOneTapLogin } from './types';
import { useGoogleButtonLogin } from './useGoogleOneTapLogin';

export interface GoogleButtonLoginProps extends IUseGoogleOneTapLogin {
  className?: string;
}

const GoogleButtonLogin: FunctionComponent<GoogleButtonLoginProps> = ({ children = null, className, ...props }) => {
  const googleLogin = useGoogleButtonLogin(props);
  const ref = useRef(null);
  useEffect(() => {
    googleLogin.renderButton(ref.current!, {
      theme: 'filled_black',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
    });
  }, []);

  return (<div
    className={className}
    ref={ref}
  />);
}

export { GoogleButtonLogin };
