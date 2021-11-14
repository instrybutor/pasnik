import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { environment } from '../environments/environment';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (environment.production) {
      res.sendFile('./public/index.html', { root: __dirname });
    } else {
      next();
    }
  }
}
