export const auth = {
  isAuthenticated: false,
  jwt: null,
  signin(accessToken: string, cb: (data: any) => void) {
    return;
  },
  signout(cb: () => void) {
    this.isAuthenticated = false;
    this.jwt = null;
    cb();
  },
};
