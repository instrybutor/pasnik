import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { NestJsDatabaseModule } from '@pasnik/nestjs/database';
import { NestJsCoreModule } from '@pasnik/nestjs/core';
import { ReverseProxyMiddleware } from './reverse-proxy.middleware';
import { FrontendMiddleware } from './frontend.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NestJsCoreModule, NestJsDatabaseModule, AuthModule],
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
