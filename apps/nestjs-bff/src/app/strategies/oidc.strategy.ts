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
import { UsersService } from '../users/users.service';
import { UserEntity } from '@pasnik/nestjs/database';

export interface OidcResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  userInfo: UserinfoResponse;
}

export const buildOpenIdClient = async ({ issuer, clientId, clientSecret }) => {
  const TrustIssuer = await Issuer.discover(
    `${issuer}/.well-known/openid-configuration`
  );
  return new TrustIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
  });
};

export function CreateOidcStrategy(
  name: 'slack' | 'google',
  params: StrategyOptions,
  usersService: UsersService
) {
  class OidcStrategy extends PassportStrategy(Strategy, name) {
    client: Client;

    constructor({ client, ...rest }: StrategyOptions) {
      super({
        client,
        ...rest,
      });

      this.client = client;
    }

    async validate(tokenSet: TokenSet): Promise<UserEntity> {
      const userInfo: UserinfoResponse = await this.client.userinfo(tokenSet);

      try {
        return await usersService.upsertOidcUser(userInfo, name);
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
  }

  return new OidcStrategy(params);
}
