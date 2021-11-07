import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import {
  InvitationsRepository,
  UsersRepository,
} from '@pasnik/nestjs/database';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationsRepository, UsersRepository])],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [InvitationsService],
})
export class InvitationsModule {}
