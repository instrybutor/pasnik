import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { UsersService } from '../users/users.service';
import { GoogleIdTokenStrategy } from './google-id-token.strategy';
import { UserEntity } from '../entities/user.entity';

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
    profile: Profile,
    done: (error: Error | null, user: UserEntity | null) => void
  ): Promise<void> {
    return this.usersService.createUser(profile)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      })
  }
}
