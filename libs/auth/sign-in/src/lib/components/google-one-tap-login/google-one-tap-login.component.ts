import { FunctionComponent, memo, ReactElement } from 'react';

import { IUseGoogleOneTapLogin } from './types';
import { useGoogleOneTapLogin } from './google-one-tap-login.hook';

export const GoogleOneTapLogin: FunctionComponent<IUseGoogleOneTapLogin> = memo(
  ({ children = null, ...props }) => {
    useGoogleOneTapLogin(props);
    return children as ReactElement;
  }
);
