import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (!ctx.getRequest().path.startsWith('/api')) {
      response.sendFile(path.resolve('./public/index.html'));
    }
    {
      response.sendStatus(404);
    }
  }
}
