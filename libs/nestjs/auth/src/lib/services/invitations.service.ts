import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InvitationsRepository,
  UserEntity,
  UsersRepository,
} from '@pasnik/nestjs/database';
import { InvitationModel, InvitationStatus } from '@pasnik/api/data-transfer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface CanAccessState {
  status: InvitationStatus | null;
  requestToken?: string;
}

interface RequestTokenModel {
  email: string;
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

  async requestAccess(requestToken: string) {
    const { email } = this.decodeRequestToken(requestToken);
    return await this.invitationsRepository.requestAccess(email);
  }

  async setUser(user: UserEntity) {
    return this.invitationsRepository.setUser(user.email, user);
  }

  async canAccess(email: string): Promise<CanAccessState> {
    if (!this.invitationsEnabled) {
      return { status: InvitationStatus.INVITATION_DISABLED };
    }
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      return {
        status: InvitationStatus.REGISTERED,
      };
    }

    const status = await this.invitationsRepository
      .findOne({ where: { email } })
      .then(
        (invitation) =>
          invitation?.status ?? InvitationStatus.INVITATION_REQUIRED
      );

    const requestToken =
      status === InvitationStatus.INVITATION_REQUIRED
        ? this.generateAccessToken({ email })
        : null;
    return {
      status,
      requestToken,
    };
  }

  private decodeRequestToken(requestToken: string) {
    return this.jwtService.decode(requestToken) as InvitationModel;
  }

  private generateAccessToken(model: RequestTokenModel): string {
    return this.jwtService.sign(model);
  }
}
