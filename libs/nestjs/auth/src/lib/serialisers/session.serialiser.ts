import { PassportSerializer } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@pasnik/nestjs/database';
import { AuthService } from '../services/auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: AuthService) {
    super();
  }

  serializeUser({ id }: UserEntity, done: CallableFunction) {
    done(null, id);
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    const user = await this.usersService.findUserById(userId);
    if (user) {
      done(null, user);
    } else {
      done(new UnauthorizedException());
    }
  }
}
