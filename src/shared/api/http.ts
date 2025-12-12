import axios from 'axios';
import { getAccessToken, refreshTokenIfNeeded, logout } from '../../features/auth/authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8998',
});

api.interceptors.request.use(async (config) => {
  await refreshTokenIfNeeded();
  const token = getAccessToken();
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && originalRequest) {
      const refreshed = await refreshTokenIfNeeded();
      if (refreshed) {
        const token = getAccessToken();
        if (token) {
          originalRequest.headers = {
            ...(originalRequest.headers ?? {}),
            Authorization: `Bearer ${token}`,
          };
        }
        return api.request(originalRequest);
      }
      await logout();
    }
    return Promise.reject(error);
  }
);

export default api;
