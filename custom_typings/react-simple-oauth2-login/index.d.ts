declare module 'react-simple-oauth2-login' {
  import React from 'react';

  export interface OAuth2LoginProps {
    id?: string;
    authorizationUrl: string;
    clientId: string;
    redirectUri: string;
    responseType: 'code' | 'token';
    onSuccess: (response: { code: string }) => void;
    onFailure: (error: Error) => void;
    buttonText?: string;
    children?: node;
    popupWidth?: number;
    popupHeight?: number;
    className?: string;
    render?: () => void;
    isCrossOrigin?: boolean;
    onRequest?: () => void;
    scope?: string;
    state?: string;
    extraParams?: object;
  }

  declare class OAuth2Login extends React.Component<OAuth2LoginProps> {}

  export default OAuth2Login;
}
