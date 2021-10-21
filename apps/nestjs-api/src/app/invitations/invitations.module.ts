import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../repositories/users.repository';
import { InvitationsService } from './invitations.service';
import { InvitationsRepository } from '../repositories/invitations.repository';
import { InvitationsController } from './invitations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InvitationsRepository, UsersRepository])],
  controllers: [InvitationsController],
  providers: [InvitationsService],
  exports: [InvitationsService],
})
export class InvitationsModule {}
