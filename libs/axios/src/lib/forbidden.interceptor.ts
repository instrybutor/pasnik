import { AxiosError, AxiosResponse } from 'axios';
import { redirectToLogin } from './redirect-to-login';

export const forbiddenInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: function (error: AxiosError) {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  },
};
