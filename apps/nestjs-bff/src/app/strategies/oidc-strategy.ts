import { HttpException, HttpStatus } from '@nestjs/common';
import { Client, TokenSet, UserinfoResponse } from 'openid-client';
import { UserEntity } from '@pasnik/nestjs/database';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { CanAccessState } from '../invitations/invitations.service';
import { Strategy } from 'passport';

export abstract class OidcStrategy extends Strategy {
  abstract createUser(userInfo: UserinfoResponse): UserEntity;

  abstract canAccess(email: string): CanAccessState;

  abstract client: Client;

  async validate(tokenSet: TokenSet): Promise<UserEntity> {
    const userInfo: UserinfoResponse = await this.client.userinfo(tokenSet);

    const email = userInfo.email;
    const { status, requestToken } = await this.canAccess(email);

    if (status === InvitationStatus.NO_INVITATION) {
      throw new HttpException({ requestToken }, HttpStatus.PAYMENT_REQUIRED);
    } else if (status === InvitationStatus.REJECTED) {
      throw new HttpException('Rejected', HttpStatus.FORBIDDEN);
    } else if (status === InvitationStatus.PENDING) {
      throw new HttpException('Pending', HttpStatus.NOT_MODIFIED);
    }

    return await this.createUser(userInfo);
  }
}
