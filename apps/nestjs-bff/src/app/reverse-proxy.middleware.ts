import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@pasnik/nestjs/database';
import { RequestHandler } from '@nestjs/common/interfaces';
import { JwtModel } from '@pasnik/api/data-transfer';
import { API_URL } from '@pasnik/nestjs/common';

@Injectable()
export class ReverseProxyMiddleware implements NestMiddleware {
  private readonly proxy: RequestHandler;

  constructor(
    readonly jwtService: JwtService,
    @Inject(API_URL) readonly apiUrl: string
  ) {
    const target = new URL(apiUrl).href;
    this.proxy = createProxyMiddleware('/api', {
      target,
      changeOrigin: true,
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
    });
  }

  use(req: Request, res: Response, next: CallableFunction) {
    this.proxy(req, res, next);
  }
}
