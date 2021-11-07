import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDtoSuccess } from '@pasnik/api/data-transfer';
import { JwtModel } from './jwt.model';
import { UserEntity } from '@pasnik/nestjs/entities';
import { InvitationModel } from './invitation.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(user: UserEntity): SignInDtoSuccess {
    const jwtModel: JwtModel = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(jwtModel),
    };
  }

  generateAccessToken(email: string): string {
    const invitationModel: InvitationModel = { email };
    return this.jwtService.sign(invitationModel);
  }

  decodeRequestToken(requestToken: string) {
    const { email } = this.jwtService.decode(requestToken) as InvitationModel;
    return email;
  }
}
