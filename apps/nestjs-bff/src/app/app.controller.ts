import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleGuard } from './strategies/google.guard';
import { SlackGuard } from './strategies/slack.guard';
import { CurrentUser } from '@pasnik/nestjs/auth';

@Controller()
export class AppController {
  @UseGuards(SlackGuard)
  @Get('/slack')
  slackLogin(@CurrentUser() user?: any) {
    return user;
  }
  @UseGuards(GoogleGuard)
  @Get('/google')
  googleLogin(@CurrentUser() user: any) {
    return user;
  }

  @Get('/me')
  me(@CurrentUser() user: any, @Session() session: Record<string, any>) {
    return session;
  }

  @Get('/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
