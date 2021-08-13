import { FunctionComponent, memo, ReactElement } from 'react';
import { IUseGoogleOneTapLogin } from './types';
import { useGoogleOneTapLogin } from './useGoogleOneTapLogin';

const GoogleOneTapLogin: FunctionComponent<IUseGoogleOneTapLogin> = ({
  children = null,
  ...props
}) => {
  useGoogleOneTapLogin(props);
  return children as ReactElement;
};

export default memo(GoogleOneTapLogin);

export { useGoogleOneTapLogin };
