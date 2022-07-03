import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
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
    try {
      const user = await this.usersService.findUserById(userId);
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
}
