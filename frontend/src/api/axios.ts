import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const api: AxiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
});

export default api;