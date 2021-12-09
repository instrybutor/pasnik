import axios from 'axios';
import { forbiddenInterceptor } from './forbidden.interceptor';

axios.interceptors.response.use(
  forbiddenInterceptor.onFulfilled,
  forbiddenInterceptor.onRejected
);

export { axios };
