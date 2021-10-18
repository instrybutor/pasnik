import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FrontendMiddleware } from './frontend.middleware';
import { OrdersModule } from './orders';
import { DishesModule } from './dishes';
import DatabaseConfig from './db/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local'
    }),
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      autoLoadEntities: true
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    DishesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware).exclude('api/(.*)').forRoutes({
      path: '/**',
      method: RequestMethod.ALL,
    });
  }
}
