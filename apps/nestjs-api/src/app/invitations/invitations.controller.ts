import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { ChangeInvitationStatusDto } from '@pasnik/api/data-transfer';
import { CurrentUser, IsAdminGuard } from '@pasnik/nestjs/auth';
import { UserEntity } from '@pasnik/nestjs/database';

import { InvitationsService } from './invitations.service';

@Controller('admin/invitations')
@UseGuards(IsAdminGuard)
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  findAll() {
    return this.invitationsService.findAll();
  }

  @Post('/:email/change-status')
  changeStatus(
    @Param('email') email: string,
    @Body() changeInvitationStatusDto: ChangeInvitationStatusDto,
    @CurrentUser() user: UserEntity
  ) {
    return this.invitationsService.changeStatus(
      email,
      changeInvitationStatusDto,
      user
    );
  }
}
