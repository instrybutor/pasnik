import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './public.route';
import { UserEntity } from '@pasnik/nestjs/entities';
import { CurrentUser } from './current-user.decorator';
import { RequestAccessDto } from '@pasnik/api/data-transfer';
import { InvitationsService } from '../invitations/invitations.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private invitationService: InvitationsService
  ) {}

  @Public()
  @Post('/request-access')
  requestAccess(@Body() { requestToken }: RequestAccessDto) {
    const email = this.authService.decodeRequestToken(requestToken);

    return this.invitationService.requestAccess(email);
  }

  @Public()
  @UseGuards(AuthGuard('google-token'))
  @Get('/google')
  googleLogin(@CurrentUser() user: UserEntity) {
    return this.authService.login(user);
  }

  @Public()
  @UseGuards(AuthGuard('oidc'))
  @Get('/slack')
  slackLogin(@CurrentUser() user: UserEntity) {
    return this.authService.login(user);
  }

  @Get('/me')
  async me(@CurrentUser() user: UserEntity) {
    return user;
  }
}
