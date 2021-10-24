import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { UsersService } from '../users/users.service';
import { GoogleIdTokenStrategy } from './google-id-token.strategy';
import { UserEntity } from '../entities/user.entity';
import { InvitationsService } from '../invitations/invitations.service';
import { AuthService } from './auth.service';
import { InvitationStatus } from '@pasnik/api/data-transfer';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleIdTokenStrategy,
  'google-token'
) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService,
    private invitationService: InvitationsService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get('NX_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('NX_GOOGLE_SECRET'),
    });
  }

  async validate(profile: Profile): Promise<UserEntity> {
    const email = profile.emails[0].value;
    const { status } = await this.invitationService.canAccess(email);

    if (status === InvitationStatus.NO_INVITATION) {
      const requestToken = this.authService.generateAccessToken(email);
      throw new HttpException({ requestToken }, HttpStatus.PAYMENT_REQUIRED);
    } else if (status === InvitationStatus.REJECTED) {
      throw new HttpException('Rejected', HttpStatus.FORBIDDEN);
    } else if (status === InvitationStatus.PENDING) {
      throw new HttpException('Pending', HttpStatus.NOT_MODIFIED);
    }

    const user = await this.usersService.createUser(profile);

    if (status === InvitationStatus.APPROVED) {
      await this.invitationService.setUser(user);
    }

    return user;
  }
}
