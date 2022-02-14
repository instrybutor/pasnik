import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ForbiddenError } from '@casl/ability';

@Catch(ForbiddenError as any)
export class CaslExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenError<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}