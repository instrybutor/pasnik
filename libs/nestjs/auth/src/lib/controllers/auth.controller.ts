import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { RequestAccessDto } from '@pasnik/api/data-transfer';
import { UserEntity } from '@pasnik/nestjs/database';

import { GoogleGuard } from '../guards/google.guard';
import { SlackGuard } from '../guards/slack.guard';
import { CookieAuthenticationGuard } from '../guards/cookie-authentication.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UnauthenticatedGuard } from '../guards/unauthenticated.guard';
import { InvitationRequiredErrorFilter } from '../filters/invitation-required-error.filter';
import { InvitationsService } from '../services/invitations.service';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@UseFilters(InvitationRequiredErrorFilter)
export class AuthController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(CookieAuthenticationGuard)
  @Get('/success')
  success(@Res() res: Response) {
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage({ status: 'success' }, location.origin);
          window.close();
        }
      </script>
    `);
  }

  @UseGuards(UnauthenticatedGuard, SlackGuard, CookieAuthenticationGuard)
  @Get('/slack')
  slackLogin(@Res() response: Response) {
    response.redirect('/auth/success');
  }

  @UseGuards(UnauthenticatedGuard, GoogleGuard, CookieAuthenticationGuard)
  @Get('/google')
  googleCallback(@Res() response: Response) {
    response.redirect('/auth/success');
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get('/me')
  me(@CurrentUser() user: UserEntity) {
    return user;
  }

  @UseGuards(CookieAuthenticationGuard)
  @Post('/logout')
  logout(@Req() req: Request) {
    req.logout();
    req.session.cookie.maxAge = 0;
  }

  @Post('/request-access')
  requestAccess(@Body() { requestToken }: RequestAccessDto) {
    return this.invitationsService.requestAccess(requestToken);
  }

  @UseGuards(CookieAuthenticationGuard)
  @Post('/set-default-workspace/:workspaceId')
  setDefaultWorkspace(
    @Param('workspaceId') workspaceId: string,
    @CurrentUser() user: UserEntity
  ) {
    return this.authService.setDefaultWorkspace(user, +workspaceId);
  }
}
