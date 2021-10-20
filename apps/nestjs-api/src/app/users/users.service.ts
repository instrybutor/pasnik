import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { UserEntity } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
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
    const existingUser = await this.usersRepository.findOne({
      where: { googleId: profile.id },
    });
    if (!existingUser) {
      const invitation = await
    }
    const user = await this.usersRepository.upsertGoogleUser(profile);
    return this.findOne(user.id);
  }
}
