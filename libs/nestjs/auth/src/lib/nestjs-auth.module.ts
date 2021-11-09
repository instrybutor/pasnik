import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  InvitationsRepository,
  UsersRepository,
} from '@pasnik/nestjs/database';

import { SlackStrategyFactory } from './strategies/slack-strategy.factory';
import { GoogleStrategyOptionsFactory } from './strategies/google-strategy.factory';
import { GoogleStrategy } from './strategies/google-strategy';
import { AuthController } from './controllers/auth.controller';
import { InvitationsController } from './controllers/invitations.controller';
import { AuthService } from './services/auth.service';
import { SessionSerializer } from './serialisers/session.serialiser';
import { InvitationsService } from './services/invitations.service';
import { NestJsCommonModule } from '@pasnik/nestjs/common';

@Module({
  imports: [
    NestJsCommonModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UsersRepository, InvitationsRepository]),
  ],
  controllers: [AuthController, InvitationsController],
  providers: [
    AuthService,
    InvitationsService,
    SessionSerializer,
    SlackStrategyFactory,
    GoogleStrategyOptionsFactory,
    GoogleStrategy,
  ],
})
export class NestJsAuthModule {}
