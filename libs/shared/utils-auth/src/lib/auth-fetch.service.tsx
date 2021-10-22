const REDIRECT_URL = '/login';

export function authFetch<T extends unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const { headers } = init ?? {};
  const newHeaders = new Headers(headers ?? {});
  const jwt = localStorage.getItem('jwt');

  function redirectLogin() {
    if (window.location.pathname !== REDIRECT_URL) {
      if (window.location.pathname !== '') {
        window.location.href = `${REDIRECT_URL}?redirectTo=${window.location.pathname}`;
      } else {
        window.location.href = REDIRECT_URL;
      }
    }
  }

  if (!jwt) {
    redirectLogin();
    return Promise.reject('JWT missing');
  }

  newHeaders.set('Authorization', `Bearer ${jwt}`);
  newHeaders.set('Content-Type', 'application/json');

  return fetch(input, {
    ...init,
    headers: newHeaders,
  }).then((response) => {
    if (response.status === 401) {
      localStorage.removeItem('jwt');
      redirectLogin();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      throw new Error('Backend issue');
    }

    return response.json();
  });
}
