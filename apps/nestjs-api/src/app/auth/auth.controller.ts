import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './public.route';
import { User } from '../entities/user.entity';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('google-token'))
  @Get('/google')
  googleLogin(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Get('/me')
  async me(@CurrentUser() user: User) {
    return user;
  }
}
