export class AxiosForbiddenError extends Error {
  readonly shouldShow = true;
  constructor(readonly message: string, readonly statusCode: number) {
    super(message);
  }
}
