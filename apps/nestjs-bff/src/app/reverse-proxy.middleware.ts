import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ReverseProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware('/api', {
    target: 'http://localhost:3333/api',
    secure: false,
    onProxyReq: (proxyReq, req: Request, res: Response) => {
      const session = req.session as any;
      const token = session.passport?.user?.id_token;
      if (token) {
        proxyReq.setHeader('Authorization', `Bearer ${token}`);
        console.log(
          `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`
        );
      } else {
        res.sendStatus(401);
      }
    },
  });

  use(req: Request, res: Response, next: () => void) {
    this.proxy(req, res, next);
  }
}
