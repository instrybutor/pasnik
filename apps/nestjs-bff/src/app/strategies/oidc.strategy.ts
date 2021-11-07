import {
  HttpException,
  HttpStatus,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Issuer,
  Strategy,
  StrategyOptions,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { PassportStrategy } from '@nestjs/passport';
import { UserEntity } from '@pasnik/nestjs/database';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { InvitationsService } from '../invitations/invitations.service';
import { UsersService } from '../users/users.service';

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
  { client, ...rest }: StrategyOptions
) {
  class OidcStrategy extends PassportStrategy(Strategy, name) {
    constructor(
      private readonly invitationService: InvitationsService,
      private readonly usersService: UsersService
    ) {
      super({
        client,
        ...rest,
      });
    }

    async validate(tokenSet: TokenSet): Promise<UserEntity> {
      const userInfo: UserinfoResponse = await client.userinfo(tokenSet);

      try {
        const email = userInfo.email;
        const { status } = await this.invitationService.canAccess(email);

        if (status === InvitationStatus.NO_INVITATION) {
          // const requestToken = this.authService.generateAccessToken(email);
          // throw new HttpException(
          //   { requestToken },
          //   HttpStatus.PAYMENT_REQUIRED
          // );
        } else if (status === InvitationStatus.REJECTED) {
          throw new HttpException('Rejected', HttpStatus.FORBIDDEN);
        } else if (status === InvitationStatus.PENDING) {
          throw new HttpException('Pending', HttpStatus.NOT_MODIFIED);
        }

        const user = await this.usersService.upsertOidcUser(userInfo, name);

        if (status === InvitationStatus.APPROVED) {
          await this.invitationService.setUser(user);
        }

        return user;
      } catch (err) {
        throw new UnauthorizedException();
      }
    }
  }

  return mixin(OidcStrategy);
}
