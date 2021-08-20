export function authFetch(input: RequestInfo, init?: RequestInit) {
  const { headers } = init ?? {};
  const newHeaders = new Headers(headers ?? {});
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return Promise.reject('JWT missing');
  }
  newHeaders.set('Authorization', `Bearer ${jwt}`);
  newHeaders.set('Content-Type', 'application/json');
  return fetch(input, {
    ...init,
    headers: newHeaders,
  }).then((response) => {
    if (response.status === 401) {
      // window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    return response;
  });
}
