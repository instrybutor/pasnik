import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '@pasnik/api/data-transfer';

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

  async update(user: UserEntity, payload: UpdateUserDto) {
    user.lastNotificationDate = new Date(payload.lastNotificationDate);

    await this.usersRepository.save(user);
    return this.findOne(user.id);
  }
}
