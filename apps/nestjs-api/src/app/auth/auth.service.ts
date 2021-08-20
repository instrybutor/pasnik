import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDtoSuccess } from '@pasnik/api/data-transfer';
import { JwtModel } from './jwt.model';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: UserEntity): Promise<SignInDtoSuccess> {
    const jwtModel: JwtModel = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(jwtModel),
    };
  }
}
