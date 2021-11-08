import { Module } from '@nestjs/common';

import { UsersRepository } from '@pasnik/nestjs/database';
import { SlackStrategyFactory } from '../strategies/slack-strategy.factory';
import { SessionSerializer } from './session.serialiser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategyOptionsFactory } from '../strategies/google-strategy.factory';
import { GoogleStrategy } from '../strategies/google-strategy';
import { InvitationsModule } from '../invitations/invitations.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UsersRepository]),
    InvitationsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SessionSerializer,
    SlackStrategyFactory,
    GoogleStrategyOptionsFactory,
    GoogleStrategy,
  ],
})
export class AuthModule {}
