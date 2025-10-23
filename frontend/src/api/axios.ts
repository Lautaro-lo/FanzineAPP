import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const api: AxiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000',
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default api;