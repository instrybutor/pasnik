import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InvitationsRepository,
  UserEntity,
  UsersRepository,
} from '@pasnik/nestjs/database';
import {
  ChangeInvitationStatusDto,
  InvitationStatus,
} from '@pasnik/api/data-transfer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface CanAccessState {
  status: InvitationStatus | null;
  requestToken?: string;
}

@Injectable()
export class InvitationsService {
  private readonly invitationsEnabled;

  constructor(
    @InjectRepository(InvitationsRepository)
    private invitationsRepository: InvitationsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    configService: ConfigService,
    private jwtService: JwtService
  ) {
    this.invitationsEnabled =
      configService.get('ENABLE_INVITATIONS', 'false') === 'true';
  }

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

  async requestAccess(email: string) {
    return await this.invitationsRepository.requestAccess(email);
  }

  async approveAccess(email: string, changedBy: UserEntity) {
    return await this.invitationsRepository.approveAccess(email, changedBy);
  }

  async rejectAccess(email: string, changedBy: UserEntity) {
    return await this.invitationsRepository.rejectAccess(email, changedBy);
  }

  async setUser(user: UserEntity) {
    return this.invitationsRepository.setUser(user.email, user);
  }

  async canAccess(email: string): Promise<CanAccessState> {
    if (!this.invitationsEnabled) {
      return { status: InvitationStatus.REGISTERED };
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      return { status: InvitationStatus.REGISTERED };
    }
    return await this.invitationsRepository
      .findOne({
        where: { email },
      })
      .then((invitation) => {
        const status = invitation?.status ?? InvitationStatus.NO_INVITATION;
        const requestToken =
          status === InvitationStatus.NO_INVITATION
            ? this.generateAccessToken(email)
            : null;
        return {
          status,
          requestToken,
        };
      });
  }

  private generateAccessToken(email: string): string {
    const invitationModel = { email };
    return this.jwtService.sign(invitationModel);
  }
}
