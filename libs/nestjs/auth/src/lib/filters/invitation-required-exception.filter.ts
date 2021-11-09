import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvitationRequiredException } from '../exceptions/invitation-required.exception';

@Catch(InvitationRequiredException)
export class InvitationRequiredExceptionFilter implements ExceptionFilter {
  catch(exception: InvitationRequiredException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.PAYMENT_REQUIRED).send(`
      <script>
        if (window.opener) {
          window.opener.postMessage({
            status: "${exception.getStatus()}",
            requestToken: "${exception.getRequestToken()}"
          }, '*');
          window.close();
        }
      </script>
    `);
  }
}
