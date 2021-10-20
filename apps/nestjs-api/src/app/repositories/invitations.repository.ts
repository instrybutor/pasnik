import { EntityRepository, Repository } from 'typeorm';
import { InvitationEntity } from '../entities/invitation.entity';
import { UserEntity } from '../entities/user.entity';
import { InvitationStatus } from '@pasnik/api/data-transfer';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(InvitationEntity)
export class InvitationsRepository extends Repository<InvitationEntity> {
  findByEmail(email: string) {
    return this.findOneOrFail({ where: { email }});
  }

  async acceptUser(email: string, addedBy: UserEntity) {
    const invitation = (await this.findOne({ where: { email }})) ?? new InvitationEntity();
    invitation.email = email;
    invitation.acceptedBy = addedBy;
    invitation.status = InvitationStatus.ACCEPTED;
    return this.save(invitation);
  }

  async requestAccess(email: string) {
    const existingInvitation = this.findOne({ where: { email }});
    if (existingInvitation) {
      throw new HttpException('Already requested', HttpStatus.NOT_MODIFIED);
    }
    const invitation = new InvitationEntity();
    invitation.email = email;
    invitation.status = InvitationStatus.REQUESTED;
    return this.save(invitation);
  }
}
