import { UnauthorizedException } from '@nestjs/common';
import {
  Client,
  Issuer,
  Strategy,
  StrategyOptions,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { PassportStrategy } from '@nestjs/passport';

export const buildOpenIdClient = async ({ issuer, clientId, clientSecret }) => {
  const TrustIssuer = await Issuer.discover(
    `${issuer}/.well-known/openid-configuration`
  );
  return new TrustIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
  });
};

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  client: Client;

  constructor({ client, ...rest }: StrategyOptions) {
    super({
      client,
      ...rest,
    });

    this.client = client;
  }

  async validate(tokenset: TokenSet): Promise<any> {
    const userinfo: UserinfoResponse = await this.client.userinfo(tokenset);

    console.log(tokenset);

    try {
      const id_token = tokenset.id_token;
      const access_token = tokenset.access_token;
      const refresh_token = tokenset.refresh_token;
      const user = {
        id_token,
        access_token,
        refresh_token,
        userinfo,
      };
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
