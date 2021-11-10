import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { NestJsDatabaseModule } from '@pasnik/nestjs/database';
import { NestJsCoreModule } from '@pasnik/nestjs/core';
import { JwtAuthGuard } from '@pasnik/nestjs/auth';

import { UsersModule } from './users';
import { OrdersModule } from './orders';
import { DishesModule } from './dishes';
import { InvitationsModule } from './invitations';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJsCoreModule,
    NestJsDatabaseModule,
    UsersModule,
    OrdersModule,
    DishesModule,
    InvitationsModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
