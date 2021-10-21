import { EntityRepository, Repository } from 'typeorm';
import { InvitationEntity } from '../entities/invitation.entity';
import { UserEntity } from '../entities/user.entity';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(InvitationEntity)
export class InvitationsRepository extends Repository<InvitationEntity> {
  findByEmail(email: string) {
    return this.findOneOrFail({ where: { email } });
  }

  async approveAccess(email: string, changedBy: UserEntity) {
    const invitation =
      (await this.findOne({ where: { email } })) ?? new InvitationEntity();
    invitation.email = email;
    invitation.changedBy = changedBy;
    invitation.status = InvitationStatus.APPROVED;
    return await this.save(invitation);
  }

  async setUser(email: string, user: UserEntity) {
    return await this.update(
      { email },
      { user, status: InvitationStatus.REGISTERED }
    );
  }

  async rejectAccess(email: string, changedBy: UserEntity) {
    const invitation = await this.findOneOrFail({
      where: { email },
      relations: ['user'],
    });
    if (invitation.user) {
      throw new HttpException(
        'Cannot reject complete invitation',
        HttpStatus.FORBIDDEN
      );
    }
    invitation.changedBy = changedBy;
    invitation.status = InvitationStatus.REJECTED;
    return await this.save(invitation);
  }

  async requestAccess(email: string) {
    const existingInvitation = await this.findOne({ where: { email } });
    if (existingInvitation) {
      throw new HttpException('Already requested', HttpStatus.NOT_MODIFIED);
    }
    const invitation = new InvitationEntity();
    invitation.email = email;
    invitation.status = InvitationStatus.PENDING;
    return await this.save(invitation);
  }
}
