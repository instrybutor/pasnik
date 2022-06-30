import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch() // eslint-disable-line @typescript-eslint/no-explicit-any
export class ValidationPipeFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
  }
}
