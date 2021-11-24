import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtModel } from '@pasnik/api/data-transfer';

@Injectable()
export class AuthJwtMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && (authHeaders as string).split(' ')[1]) {
      const token = (authHeaders as string).split(' ')[1];
      const { userId }: JwtModel = this.jwtService.verify(token);
      const user = await this.userService.findOne(userId);

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
      }
      req.user = user;
      next();
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
