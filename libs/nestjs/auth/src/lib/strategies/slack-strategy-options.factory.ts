import { buildOpenIdClient } from './oidc-strategy';
import { ConfigService } from '@nestjs/config';

export const SlackStrategyOptions = 'SlackStrategyOptions';

export const SlackStrategyOptionsFactory = {
  provide: SlackStrategyOptions,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const client = await buildOpenIdClient({
      clientId: configService.get('SLACK_CLIENT_ID'),
      clientSecret: configService.get('SLACK_SECRET'),
      issuer: 'https://slack.com',
    });
    const redirectUri = new URL('/auth/slack', configService.get('BASE_URL'))
      .href;

    return {
      client,
      params: {
        redirect_uri: redirectUri,
        scope: 'openid,profile,email',
      },
    };
  },
};
