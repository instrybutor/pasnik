import { AxiosError, AxiosResponse } from 'axios';
import { redirectToLogin } from './redirect-to-login';

export class AxiosForbiddenError extends Error {
  constructor(readonly message: string, readonly prompt: boolean) {
    super();
  }
}

export const forbiddenInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: function (error: AxiosError<unknown>) {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  },
};
