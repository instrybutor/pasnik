import { AxiosRequestConfig } from 'axios';

export const STORAGE_KEY = `access-token-${process.env.NODE_ENV}`;

type Token = string;

export const isLoggedIn = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

export const setAuthToken = (accessToken: Token): void =>
  localStorage.setItem(STORAGE_KEY, accessToken);

export const clearAuthToken = (): void => localStorage.removeItem(STORAGE_KEY);

export const getAccessToken = (): Token | undefined => {
  const accessToken = localStorage.getItem(STORAGE_KEY);
  if (!accessToken) return;

  return accessToken ?? undefined;
};

export interface IAuthTokenInterceptorConfig {
  header?: string;
  headerPrefix?: string;
  throwIfNoToken?: boolean;
  disallowedRoutes?: Array<string | RegExp>;
}

export const jwtInterceptor = ({
  header = 'Authorization',
  headerPrefix = 'Bearer ',
  throwIfNoToken = true,
  disallowedRoutes = [],
}: IAuthTokenInterceptorConfig = {}) => {
  const isDisallowedRoute = (request: AxiosRequestConfig) => {
    const requestedUrl: URL = new URL(request.url!, document.location.origin);

    return (
      disallowedRoutes.findIndex((route: string | RegExp) => {
        if (typeof route === 'string') {
          const parsedRoute: URL = new URL(route, document.location.origin);
          return (
            parsedRoute.hostname === requestedUrl.hostname &&
            parsedRoute.pathname === requestedUrl.pathname
          );
        }

        if (route instanceof RegExp) {
          return route.test(request.url!);
        }

        return false;
      }) > -1
    );
  };

  return async (
    requestConfig: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> => {
    if (isDisallowedRoute(requestConfig)) {
      return requestConfig;
    }

    const accessToken = getAccessToken();
    if (accessToken) {
      if (!requestConfig.headers) {
        requestConfig.headers = {};
      }
      requestConfig.headers[header] = `${headerPrefix}${accessToken}`;
    } else if (throwIfNoToken) {
      throw new Error('Missing JWT');
    }

    return requestConfig;
  };
};
