import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { UserEntity, UsersRepository } from '@pasnik/nestjs/database';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: string | number): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async removeUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(profile: Profile) {
    const user = await this.usersRepository.upsertGoogleUser(profile);
    return this.findOne(user.id);
  }
}
