import { buildOpenIdClient } from './oidc-strategy';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BASE_URL } from '../utils/baseUrl.provider';

export const GoogleStrategyOptions = 'GoogleStrategyOptions';

export const GoogleStrategyOptionsFactory: Provider = {
  provide: GoogleStrategyOptions,
  inject: [BASE_URL, ConfigService],
  useFactory: async (baseUrl: string, configService: ConfigService) => {
    const client = await buildOpenIdClient({
      clientId: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      issuer: 'https://accounts.google.com',
    });

    const redirectUri = new URL('/auth/google', baseUrl).href;
    return {
      client,
      params: {
        redirect_uri: redirectUri,
        scope: 'openid profile email',
      },
    };
  },
};
