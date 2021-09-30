import { ReactElement } from 'react';
import { IUseGoogleOneTapLogin } from '@pasnik/shared/utils-auth';

export interface IGoogleOneTapLogin extends IUseGoogleOneTapLogin {
  children?: ReactElement | null;
}

export interface GoogleButtonLoginProps extends IUseGoogleOneTapLogin {
  className?: string;
}
