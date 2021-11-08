import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity, UsersRepository } from '@pasnik/nestjs/database';
import { InjectRepository } from '@nestjs/typeorm';
import { UserinfoResponse } from 'openid-client';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  findUserById(id: string) {
    return this.usersRepository.findOne(id);
  }

  findUserByEmail(email: string, fail?: boolean) {
    return this.usersRepository.findByEmail(email, fail);
  }

  upsertOidcUser(
    {
      sub,
      email,
      family_name,
      given_name,
      picture,
      email_verified,
    }: UserinfoResponse,
    integration: 'slack' | 'google'
  ): Promise<UserEntity> {
    if (!email_verified) {
      throw new HttpException('Email is not verified', HttpStatus.UNAUTHORIZED);
    }
    return this.usersRepository.upsertUser({
      email,
      avatarImg: picture,
      givenName: given_name,
      familyName: family_name,
      googleId: integration === 'google' ? sub : null,
      slackId: integration === 'slack' ? sub : null,
    });
  }
}
