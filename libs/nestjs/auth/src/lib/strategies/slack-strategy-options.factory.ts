import { buildOpenIdClient } from './oidc-strategy';
import { ConfigService } from '@nestjs/config';
import { BASE_URL } from '../utils/baseUrl.provider';

export const SlackStrategyOptions = 'SlackStrategyOptions';

export const SlackStrategyOptionsFactory = {
  provide: SlackStrategyOptions,
  inject: [BASE_URL, ConfigService],
  useFactory: async (baseUrl: string, configService: ConfigService) => {
    const client = await buildOpenIdClient({
      clientId: configService.get('SLACK_CLIENT_ID'),
      clientSecret: configService.get('SLACK_SECRET'),
      issuer: 'https://slack.com',
    });
    const redirectUri = new URL('/auth/slack', baseUrl).href;

    return {
      client,
      params: {
        redirect_uri: redirectUri,
        scope: 'openid,profile,email',
      },
    };
  },
};
