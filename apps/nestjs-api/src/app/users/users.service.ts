import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity, UsersRepository } from '@pasnik/nestjs/database';

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
}
