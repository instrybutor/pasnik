import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDtoSuccess } from '@pasnik/api/data-transfer';
import { JwtModel } from './jwt.model';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User): Promise<SignInDtoSuccess> {
    const jwtModel: JwtModel = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(jwtModel),
    };
  }
}
