import { Module } from '@nestjs/common';

import { UsersRepository } from '@pasnik/nestjs/database';
import { SlackStrategyFactory } from '../strategies/slack-strategy.factory';
import { GoogleStrategyFactory } from '../strategies/google-strategy.factory';
import { SessionSerializer } from './session.serialiser';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [AuthController],
  providers: [
    UsersService,
    SessionSerializer,
    SlackStrategyFactory,
    GoogleStrategyFactory,
  ],
})
export class AuthModule {}
