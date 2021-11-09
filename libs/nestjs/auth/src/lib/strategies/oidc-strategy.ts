import {
  Client,
  Issuer,
  Strategy,
  StrategyOptions,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { UserEntity } from '@pasnik/nestjs/database';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { PassportStrategy } from '@nestjs/passport';
import { CanAccessState } from '../services/invitations.service';
import { InvitationRequiredException } from '../exceptions/invitation-required.exception';

export const buildOpenIdClient = async ({ issuer, clientId, clientSecret }) => {
  const TrustIssuer = await Issuer.discover(
    `${issuer}/.well-known/openid-configuration`
  );
  return new TrustIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
  });
};

export function CreateOidcStrategy(name: 'slack' | 'google') {
  abstract class OidcStrategy extends PassportStrategy(Strategy, name) {
    abstract createUser(userInfo: UserinfoResponse): Promise<UserEntity>;

    abstract canAccess(userInfo: UserinfoResponse): Promise<CanAccessState>;

    client: Client;

    protected constructor({ client, ...rest }: StrategyOptions) {
      super({ client, ...rest });

      this.client = client;
    }

    async validate(tokenSet: TokenSet): Promise<UserEntity> {
      const userInfo: UserinfoResponse = await this.client.userinfo(tokenSet);

      const { status, requestToken } = await this.canAccess(userInfo);

      if (
        ![InvitationStatus.APPROVED, InvitationStatus.REGISTERED].includes(
          status
        )
      ) {
        throw new InvitationRequiredException(status, requestToken);
      }

      return this.createUser(userInfo);
    }
  }

  return OidcStrategy;
}
