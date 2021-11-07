import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { NestJsDatabaseModule, UsersRepository } from '@pasnik/nestjs/database';

import { SlackStrategyFactory } from './strategies/slack-strategy.factory';
import { GoogleStrategyOptionsFactory } from './strategies/google-strategy.factory';
import { SessionSerializer } from './auth/session.serialiser';
import { ReverseProxyMiddleware } from './reverse-proxy.middleware';
import { FrontendMiddleware } from './frontend.middleware';
import { UsersService } from './users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('NX_JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    NestJsDatabaseModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [],
  providers: [
    UsersService,
    SessionSerializer,
    SlackStrategyFactory,
    GoogleStrategyOptionsFactory,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyMiddleware)
      .forRoutes({ path: 'api', method: RequestMethod.ALL });
    consumer
      .apply(FrontendMiddleware)
      .exclude('api/(.*)', 'auth/(.*)')
      .forRoutes({
        path: '/**',
        method: RequestMethod.ALL,
      });
  }
}
