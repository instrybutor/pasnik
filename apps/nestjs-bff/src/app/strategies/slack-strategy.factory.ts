import { buildOpenIdClient, CreateOidcStrategy } from './oidc.strategy';

export const SlackStrategy = 'SlackStrategy';

export const SlackStrategyFactory = {
  provide: SlackStrategy,
  useFactory: async () => {
    const client = await buildOpenIdClient({
      clientId: process.env.NX_SLACK_CLIENT_ID,
      clientSecret: process.env.NX_SLACK_SECRET,
      issuer: 'https://slack.com',
    });

    return CreateOidcStrategy('slack', {
      client,
      params: {
        redirect_uri: 'https://88d7-109-231-46-142.ngrok.io/slack',
        scope: 'openid,profile,email',
      },
      passReqToCallback: false,
      usePKCE: true,
    });
  },
};
