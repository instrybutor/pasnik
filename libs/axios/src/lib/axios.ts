import { default as _axios } from 'axios';
import { jwtInterceptor } from './jwt.interceptor';
import { forbiddenInterceptor } from './forbidden.interceptor';

const axios = _axios.create();

axios.interceptors.request.use(
  jwtInterceptor({
    disallowedRoutes: [/\/api\/auth\/google$/],
  })
);
axios.interceptors.response.use(
  forbiddenInterceptor.onFulfilled,
  forbiddenInterceptor.onRejected
);

export { axios };
