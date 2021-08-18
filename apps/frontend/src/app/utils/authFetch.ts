export function authFetch(input: RequestInfo, init?: RequestInit) {
  const { headers } = init ?? {};
  const newHeaders = new Headers(headers ?? {});
  newHeaders.set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
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
