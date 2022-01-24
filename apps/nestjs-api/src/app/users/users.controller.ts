import { Body, Controller, Get, Put } from '@nestjs/common';

import { UserEntity } from '@pasnik/nestjs/database';
import { CurrentUser } from '@pasnik/nestjs/auth';

import { UsersService } from './users.service';
import { UpdateUserDto } from '@pasnik/api/data-transfer';

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

  @Put('/me')
  update(@CurrentUser() user: UserEntity, @Body() payload: UpdateUserDto) {
    return this.usersService.update(user, payload);
  }
}
