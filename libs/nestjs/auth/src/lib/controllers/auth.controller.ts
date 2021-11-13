import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
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

@Controller('auth')
@UseFilters(InvitationRequiredErrorFilter)
export class AuthController {
  constructor(private readonly invitationsService: InvitationsService) {}

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
  me(@CurrentUser() user: UserEntity, @Session() session: any) {
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
}
