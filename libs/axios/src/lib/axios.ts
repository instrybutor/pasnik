import { default as _axios } from 'axios';
import { forbiddenInterceptor } from './forbidden.interceptor';

const axios = _axios.create();

axios.interceptors.response.use(
  forbiddenInterceptor.onFulfilled,
  forbiddenInterceptor.onRejected
);

export { axios };
