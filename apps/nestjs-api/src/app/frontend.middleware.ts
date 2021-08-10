import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { environment } from '../environments/environment';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (environment.production) {
      res.sendFile('/public/index.html');
    } else {
      next();
    }
  }
}
