import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import {
  NestJsDatabaseModule,
  UsersRepository,
  WorkspaceUsersRepository,
} from '@pasnik/nestjs/database';
import { NestJsCoreModule } from '@pasnik/nestjs/core';
import { NestJsAuthModule } from '@pasnik/nestjs/auth';

import { ReverseProxyMiddleware } from './reverse-proxy.middleware';
import { FrontendMiddleware } from './frontend.middleware';
import { BodyParserMiddleware } from './body-parser.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMiddleware } from './workspace.middleware';

@Module({
  imports: [
    NestJsCoreModule,
    NestJsDatabaseModule,
    NestJsAuthModule,

    TypeOrmModule.forFeature([WorkspaceUsersRepository, UsersRepository]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyMiddleware)
      .forRoutes({ path: 'api/**', method: RequestMethod.ALL })
      .apply(BodyParserMiddleware)
      .forRoutes({ path: 'auth/**', method: RequestMethod.ALL })
      .apply(WorkspaceMiddleware)
      .forRoutes('workspace/:slug', 'workspace/:slug/**')
      .apply(FrontendMiddleware)
      .exclude('api/(.*)', 'auth/(.*)')
      .forRoutes({ path: '/**', method: RequestMethod.ALL });
  }
}
