import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  InvitationsRepository,
  UsersRepository,
  WorkspacesRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';

import { SlackStrategyOptionsFactory } from './strategies/slack-strategy-options.factory';
import { GoogleStrategyOptionsFactory } from './strategies/google-strategy-options.factory';
import { GoogleStrategy } from './strategies/google-strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SessionSerializer } from './serialisers/session.serialiser';
import { InvitationsService } from './services/invitations.service';
import { NestJsCommonModule } from '@pasnik/nestjs/common';
import { SlackStrategy } from './strategies/slack-strategy';

@Module({
  imports: [
    NestJsCommonModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([
      UsersRepository,
      InvitationsRepository,
      WorkspaceUsersRepository,
      WorkspacesRepository,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    InvitationsService,
    SessionSerializer,
    SlackStrategyOptionsFactory,
    GoogleStrategyOptionsFactory,
    GoogleStrategy,
    SlackStrategy,
  ],
})
export class NestJsAuthModule {}
