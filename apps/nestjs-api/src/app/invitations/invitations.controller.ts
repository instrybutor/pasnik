import { Controller, Get } from '@nestjs/common';

@Controller('api/invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsController) {}

  @Get()
  findAll() {
    return this.invitationsService.findAll();
  }
}
