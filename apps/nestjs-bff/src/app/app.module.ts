import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlackStrategyFactory } from './strategies/slack-strategy.factory';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategyFactory } from './strategies/google-strategy.factory';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serialiser';
import { ReverseProxyMiddleware } from './reverse-proxy.middleware';

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
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionSerializer,
    SlackStrategyFactory,
    GoogleStrategyFactory,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyMiddleware)
      .forRoutes({ path: 'api', method: RequestMethod.ALL });
  }
}
