import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IsAdminGuard } from '../auth/is-admin.guard';
import { InvitationsService } from './invitations.service';
import { ChangeInvitationStatusDto } from '@pasnik/api/data-transfer';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '@pasnik/nestjs/database';

@Controller('api/admin/invitations')
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
