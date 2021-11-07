import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google/google.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { InvitationsModule } from '../invitations/invitations.module';
import { UsersModule } from '../users/users.module';
import { SlackStrategy } from './slack.strategy';
import { SlackStrategyFactory } from './strategies/slack-strategy.factory';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('NX_JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    InvitationsModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    SlackStrategy,
    JwtStrategy,
    AuthService,
    SlackStrategyFactory,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
