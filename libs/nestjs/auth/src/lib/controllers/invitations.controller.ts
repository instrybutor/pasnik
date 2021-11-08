import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChangeInvitationStatusDto } from '@pasnik/api/data-transfer';
import { UserEntity } from '@pasnik/nestjs/database';
import { InvitationsService } from '../services/invitations.service';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth/invitations')
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
