import { AxiosError, AxiosResponse } from 'axios';
import { redirectToLogin } from './redirect-to-login';

export class AxiosForbiddenError extends Error {
  constructor(readonly message: string, readonly prompt: boolean) {
    super();
  }
}

interface ForbiddenBody {
  statusCode: number;
  message: string;
  prompt?: boolean;
}

export const forbiddenInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: function (error: AxiosError<unknown>) {
    if (error.response?.status === 403) {
      const { prompt, message } = error.response.data as ForbiddenBody;
      return Promise.reject(new AxiosForbiddenError(message, prompt ?? false));
    }
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  },
};
