import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { UsersService } from '../users/users.service';
import { GoogleIdTokenStrategy } from './google-id-token.strategy';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  GoogleIdTokenStrategy,
  'google-token'
) {
  constructor(
    configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    return done(null, this.usersService.createUser(profile));
  }
}
