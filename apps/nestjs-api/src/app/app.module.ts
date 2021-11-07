import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders';
import { DishesModule } from './dishes';
import { NestJsDatabaseModule } from '@pasnik/nestjs/database';
import { InvitationsModule } from './invitations/invitations.module';
import { NestJsCoreModule } from '@pasnik/nestjs/core';

@Module({
  imports: [
    NestJsCoreModule,
    NestJsDatabaseModule,
    AuthModule,
    UsersModule,
    OrdersModule,
    DishesModule,
    InvitationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
