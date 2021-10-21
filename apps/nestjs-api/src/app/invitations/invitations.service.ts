import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvitationsRepository } from '../repositories/invitations.repository';
import { UserEntity } from '../entities/user.entity';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InvitationsService {
  private readonly invitationsEnabled;
  constructor(
    @InjectRepository(InvitationsRepository)
    private invitationsRepository: InvitationsRepository,
    configService: ConfigService,
  ) {
    this.invitationsEnabled = configService.get("ENABLE_INVITATIONS", "false") === 'true';
  }

  async requestAccess(email: string) {
    return await this.invitationsRepository.requestAccess(email);
  }

  async approveAccess(email: string, approvedBy: UserEntity) {
    return await this.invitationsRepository.approveAccess(email, approvedBy);
  }

  async canAccess(email: string) {
    if (!this.invitationsEnabled) {
      return true;
    }
    return await this.invitationsRepository.findOne({ where: { email, status: InvitationStatus.APPROVED } })
      .then((invitation) => !!invitation)
  }
}
