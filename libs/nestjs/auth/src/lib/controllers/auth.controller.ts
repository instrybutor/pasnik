import {
  Controller,
  Get,
  Req,
  Res,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleGuard } from '../guards/google.guard';
import { SlackGuard } from '../guards/slack.guard';
import { CookieAuthenticationGuard } from '../guards/cookie-authentication.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserEntity } from '@pasnik/nestjs/database';
import { UnauthenticatedGuard } from '../guards/unauthenticated.guard';
import { InvitationRequiredExceptionFilter } from '../filters/invitation-required-exception.filter';

@Controller('auth')
@UseFilters(InvitationRequiredExceptionFilter)
export class AuthController {
  @UseGuards(CookieAuthenticationGuard)
  @Get('/success')
  success(@Res() res: Response) {
    res.send(`
      <script>
        if (window.opener) {
          window.opener.postMessage({ status: 'success' }, '*');
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
  @Get('/logout')
  logout(@Req() req: Request) {
    req.logout();
    req.session.cookie.maxAge = 0;
  }
}
