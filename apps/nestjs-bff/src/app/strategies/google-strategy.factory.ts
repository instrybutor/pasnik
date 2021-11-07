import { buildOpenIdClient, CreateOidcStrategy } from './oidc.strategy';

export const GoogleStrategy = 'GoogleStrategy';

export const GoogleStrategyFactory = {
  provide: GoogleStrategy,
  useFactory: async () => {
    const client = await buildOpenIdClient({
      clientId: process.env.NX_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NX_GOOGLE_SECRET,
      issuer: 'https://accounts.google.com',
    });
    return CreateOidcStrategy('google', {
      client,
      params: {
        redirect_uri: 'http://localhost:3334/google',
        scope: 'openid profile email',
      },
      sessionKey: 'googleSession',
    });
  },
};
