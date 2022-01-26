import { Controller, Get, Put } from '@nestjs/common';

import { UserEntity } from '@pasnik/nestjs/database';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { UsersService } from './users.service';
import { CurrentAbility } from '../app-ability';
import { AppAbility, UsersAction } from '@pasnik/ability';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Get()
  findAll(@CurrentAbility() ability: AppAbility) {
    if (ability.can(UsersAction.Read, 'UserModel')) {
      return this.usersService.findAll();
    } else {
      return [];
    }
  }

  @Put('/notifications-seen')
  updateLastSeenDate(@CurrentUser() user: UserEntity) {
    return this.usersService.update(user, {
      lastNotificationDate: new Date().toISOString(),
    });
  }
}
