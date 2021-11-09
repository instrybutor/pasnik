import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@pasnik/nestjs/database';
import { ConfigService } from '@nestjs/config';
import { RequestHandler } from '@nestjs/common/interfaces';
import { JwtModel } from '@pasnik/api/data-transfer';

@Injectable()
export class ReverseProxyMiddleware implements NestMiddleware {
  private readonly proxy: RequestHandler;

  constructor(
    readonly jwtService: JwtService,
    readonly configService: ConfigService
  ) {
    this.proxy = createProxyMiddleware('/api', {
      target: configService.get('API_URI'),
      secure: false,
      onProxyReq: (proxyReq, req: Request, res: Response) => {
        if (req.user) {
          const { id } = req.user as UserEntity;
          const jwtModel: JwtModel = { userId: id };
          const token = jwtService.sign(jwtModel);
          proxyReq.setHeader('Authorization', `Bearer ${token}`);
          console.log(
            `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`
          );
        } else {
          res.sendStatus(401);
        }
      },
      onError: (err, req, res: Response, target) => {
        console.error(err.message);
        res.sendStatus(HttpStatus.SERVICE_UNAVAILABLE);
      },
    });
  }

  use(req: Request, res: Response, next: () => void) {
    this.proxy(req, res, next);
  }
}