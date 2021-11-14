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
import { InvitationsService } from '../services/invitations.service';
import { InvitationRequiredError } from '@pasnik/shared/utils';

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

    client: Client;

    protected constructor(
      { client, ...rest }: StrategyOptions,
      private readonly invitationService: InvitationsService
    ) {
      super({ client, ...rest });

      this.client = client;
    }

    async validate(tokenSet: TokenSet): Promise<UserEntity> {
      const userInfo: UserinfoResponse = await this.client.userinfo(tokenSet);

      const { status, requestToken } = await this.invitationService.canAccess(
        userInfo.email
      );

      if (
        ![
          InvitationStatus.INVITATION_DISABLED,
          InvitationStatus.APPROVED,
          InvitationStatus.REGISTERED,
        ].includes(status)
      ) {
        throw new InvitationRequiredError(status, requestToken);
      }

      return this.createUser(userInfo).then(async (user) => {
        if (status === InvitationStatus.APPROVED) {
          await this.invitationService.setUser(user);
        }
        return user;
      });
    }
  }

  return OidcStrategy;
}
