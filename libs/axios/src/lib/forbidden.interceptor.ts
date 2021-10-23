import { redirectToLogin } from '@pasnik/shared/utils';
import { AxiosError, AxiosResponse } from 'axios';

export const forbiddenInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: function (error: AxiosError) {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  },
};
