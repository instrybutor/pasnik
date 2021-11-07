import { buildOpenIdClient, OidcStrategy } from './oidc.strategy';

export const SlackStrategy = 'SlackStrategy';

export const SlackStrategyFactory = {
  provide: SlackStrategy,
  useFactory: async () => {
    const client = await buildOpenIdClient({
      clientId: process.env.NX_SLACK_CLIENT_ID,
      clientSecret: process.env.NX_SLACK_SECRET,
      issuer: 'https://slack.com',
    });
    return new OidcStrategy({
      client,
      params: {
        redirect_uri: process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_REDIRECT_URI,
        scope: 'openid,profile,email',
      },
      passReqToCallback: false,
      usePKCE: false,
    });
  },
};
