import axios from 'axios';
import { API_SERVER_PATH } from './config';

export const instance = axios.create({
  baseURL: API_SERVER_PATH,
  timeout: 3000,
});

// ----------------------------------
// axios request 처리
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    return error.response;
  },
);
