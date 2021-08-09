import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req, res, next) {
    const { url } = req;
    if (url.indexOf('/api') === 1) {
      next();
    } else {
      res.sendFile('/public/index.html');
    }
  }
}
