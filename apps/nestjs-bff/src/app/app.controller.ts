import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleGuard } from './strategies/google.guard';
import { SlackGuard } from './strategies/slack.guard';
import { CookieAuthenticationGuard } from './cookie-authentication.guard';
import { CurrentUser } from './current-user.decorator';
import { UserEntity } from '@pasnik/nestjs/database';
import { UnauthenticatedGuard } from './unauthenticated.guard';

@Controller('auth')
export class AppController {
  @UseGuards(CookieAuthenticationGuard)
  @Get('/success')
  success(@Res() res: Response) {
    res.send(`
      <script>
        window.postMessage('success', '*');
      </script>
    `);
  }

  @UseGuards(SlackGuard)
  @Get('/slack')
  slackLogin(@Res() response: Response) {
    response.redirect('/auth/me');
  }

  @UseGuards(UnauthenticatedGuard, GoogleGuard, CookieAuthenticationGuard)
  @Get('/google')
  googleCallback(@Res() response: Response) {
    response.redirect('/auth/me');
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get('/me')
  me(@CurrentUser() user: UserEntity, @Session() session: any) {
    return session;
  }

  @UseGuards(CookieAuthenticationGuard)
  @Get('/logout')
  logout(@Req() req: Request) {
    req.logout();
    req.session.cookie.maxAge = 0;
  }
}
