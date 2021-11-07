import { PassportSerializer } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { UserEntity } from '@pasnik/nestjs/database';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser({ id }: UserEntity, done: CallableFunction) {
    done(null, id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.findUserById(userId);
    if (user) {
      done(null, user);
    } else {
      done(new UnauthorizedException());
    }
  }
}
