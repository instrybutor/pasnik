import { Controller, Get, Put } from '@nestjs/common';

import { UserEntity } from '@pasnik/nestjs/database';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put('/notifications-seen')
  updateLastSeenDate(@CurrentUser() user: UserEntity) {
    return this.usersService.update(user, {
      lastNotificationDate: new Date().toISOString(),
    });
  }
}
