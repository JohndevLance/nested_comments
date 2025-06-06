import axios from 'axios';
import {authHeader} from '../helpers/authHelper';

export const axiosAuthApi = axios.create({
  baseURL: 'https://xsrr-l2ye-dpbj.f2.xano.io/api:A43o366j:staging',
  timeout: 10000,
  headers: {},
});

axiosAuthApi.interceptors.request.use(
  async config => {
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-Data-Source'] = 'staging';
    return config;
  },
  error => Promise.reject(error),
);

export const axiosApi = axios.create({
  baseURL: 'https://xsrr-l2ye-dpbj.f2.xano.io/api:Coq7oZJp:staging',
  timeout: 30000,
  headers: {},
});

export const axiosCommentApi = axios.create({
  baseURL:
    'https://xsrr-l2ye-dpbj.f2.xano.io/api:HPNnGSlw:staging/comments?post_id=bba1c105-7dd9-410a-a0c5-19df6a0500f4',
  timeout: 30000,
  headers: {},
});

axiosApi.interceptors.request.use(
  async config => {
    config.headers = config.headers || {}; // ✅ Ensure headers is not undefined
    config.headers['X-Data-Source'] = 'staging';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = await authHeader();
    return config;
  },
  error => Promise.reject(error),
);

axiosCommentApi.interceptors.request.use(
  async config => {
    config.headers = config.headers || {}; // ✅ Ensure headers is not undefined
    config.headers['X-Data-Source'] = 'staging';
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = await authHeader();
    return config;
  },
  error => Promise.reject(error),
);

axiosAuthApi.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

axiosApi.interceptors.response.use(function (response: any) {
  return response;
});
