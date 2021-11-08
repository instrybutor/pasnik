import { Controller, Get } from '@nestjs/common';

import { UserEntity } from '@pasnik/nestjs/database';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { UsersService } from './users.service';

@Controller('api/users')
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
}
