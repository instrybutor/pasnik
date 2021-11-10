import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ChangeInvitationStatusDto,
  InvitationStatus,
} from '@pasnik/api/data-transfer';
import { InvitationsRepository, UserEntity } from '@pasnik/nestjs/database';

export interface CanAccessState {
  status: InvitationStatus | null;
}

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(InvitationsRepository)
    private invitationsRepository: InvitationsRepository
  ) {}

  async findAll() {
    return await this.invitationsRepository.find({
      relations: ['user', 'changedBy'],
    });
  }

  async findOne(email: string) {
    return await this.invitationsRepository.findOneOrFail({
      where: { email },
      relations: ['user', 'changedBy'],
    });
  }

  async changeStatus(
    email: string,
    { status }: ChangeInvitationStatusDto,
    user: UserEntity
  ) {
    if (status === InvitationStatus.APPROVED) {
      await this.approveAccess(email, user);
    } else if (status === InvitationStatus.REJECTED) {
      await this.rejectAccess(email, user);
    }

    return this.findOne(email);
  }

  async approveAccess(email: string, changedBy: UserEntity) {
    return await this.invitationsRepository.approveAccess(email, changedBy);
  }

  async rejectAccess(email: string, changedBy: UserEntity) {
    return await this.invitationsRepository.rejectAccess(email, changedBy);
  }
}
