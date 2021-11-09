import { buildOpenIdClient } from './oidc-strategy';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const GoogleStrategyOptions = 'GoogleStrategyOptions';

export const GoogleStrategyOptionsFactory: Provider = {
  provide: GoogleStrategyOptions,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const client = await buildOpenIdClient({
      clientId: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      issuer: 'https://accounts.google.com',
    });
    const redirectUri = new URL('/auth/google', configService.get('BASE_URL'))
      .href;
    return {
      client,
      params: {
        redirect_uri: redirectUri,
        scope: 'openid profile email',
      },
    };
  },
};
