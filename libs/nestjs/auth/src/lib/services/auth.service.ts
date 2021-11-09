import { Injectable } from '@nestjs/common';
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

  async upsertSlackUser({
    sub,
    email,
    family_name,
    given_name,
    picture,
  }: UserinfoResponse) {
    const currentUser = await this.usersRepository.findOne({
      where: { email },
    });
    return this.usersRepository.upsertUser({
      email,
      avatarImg: currentUser.avatarImg ?? picture,
      givenName: currentUser.givenName ?? given_name,
      familyName: currentUser.familyName ?? family_name,
      slackId: sub,
    });
  }

  upsertGoogleUser({
    sub,
    email,
    family_name,
    given_name,
    picture,
  }: UserinfoResponse): Promise<UserEntity> {
    return this.usersRepository.upsertUser({
      email,
      avatarImg: picture,
      givenName: given_name,
      familyName: family_name,
      googleId: sub,
    });
  }
}
