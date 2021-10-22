export function getRedirectUrl(pathname: string, redirectUrl: string) {
  if (pathname !== redirectUrl) {
    if (pathname !== '') {
      return `${redirectUrl}?redirectTo=${pathname}`;
    } else {
      return redirectUrl;
    }
  }
  return pathname;
}
