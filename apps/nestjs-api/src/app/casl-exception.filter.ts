import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ForbiddenError } from '@casl/ability';

@Catch(ForbiddenError as any) // eslint-disable-line @typescript-eslint/no-explicit-any
export class CaslExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: ForbiddenError<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(403).json({
      statusCode: 403,
      message: 'No permission',
      prompt: true,
    });
  }
}
