import { buildOpenIdClient } from './oidc.strategy';
import { Provider } from '@nestjs/common';

export const GoogleStrategyOptions = 'GoogleStrategyOptions';

export const GoogleStrategyOptionsFactory: Provider = {
  provide: GoogleStrategyOptions,
  useFactory: async () => {
    const client = await buildOpenIdClient({
      clientId: process.env.NX_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NX_GOOGLE_SECRET,
      issuer: 'https://accounts.google.com',
    });
    return {
      client,
      params: {
        redirect_uri: 'http://localhost:3334/auth/google',
        scope: 'openid profile email',
      },
    };
  },
};
