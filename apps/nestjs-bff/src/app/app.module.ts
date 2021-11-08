import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { NestJsDatabaseModule } from '@pasnik/nestjs/database';
import { NestJsCoreModule } from '@pasnik/nestjs/core';
import { NestjsAuthModule } from '@pasnik/nestjs/auth';

import { ReverseProxyMiddleware } from './reverse-proxy.middleware';
import { FrontendMiddleware } from './frontend.middleware';

@Module({
  imports: [NestJsCoreModule, NestJsDatabaseModule, NestjsAuthModule],
  controllers: [],
  providers: [],
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
