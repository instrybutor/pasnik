import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { InvitationRequiredError } from '@pasnik/shared/utils';

@Catch(InvitationRequiredError)
export class InvitationRequiredErrorFilter implements ExceptionFilter {
  catch(exception: InvitationRequiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.PAYMENT_REQUIRED).send(`
      <script>
        if (window.opener) {
          window.opener.postMessage({
            error: {
              status: "${exception.status}",
              requestToken: "${exception.requestToken}"
            }
          }, location.origin);
          window.close();
        }
      </script>
    `);
  }
}
