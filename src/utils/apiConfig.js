import axios from 'axios';
import { API_SERVER_PATH } from './config';

const ACCESS_TOKEN = localStorage.getItem('accessToken');

export const instance = axios.create({
  baseURL: API_SERVER_PATH,
  timeout: 3000,
});

// ----------------------------------
// axios request 처리
instance.interceptors.request.use(
  (config) => {
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// ----------------------------------
// axios response 처리
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  },
);
