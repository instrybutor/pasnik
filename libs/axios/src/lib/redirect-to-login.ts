const REDIRECT_URL = '/login';

export function redirectToLogin() {
  if (window.location.pathname !== REDIRECT_URL) {
    if (window.location.pathname !== '/') {
      window.location.href = `${REDIRECT_URL}?redirectTo=${window.location.pathname}`;
    } else {
      window.location.href = REDIRECT_URL;
    }
  }
}
