import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InvitationModel } from './invitation.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  decodeRequestToken(requestToken: string) {
    const { email } = this.jwtService.decode(requestToken) as InvitationModel;
    return email;
  }
}
