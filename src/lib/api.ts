import useUserStore from '@/storage/useUserStore';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

export const Api = axios.create({
  baseURL: Config.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
Api.interceptors.request.use(async config => {
  const accessToken = useUserStore.getState().token;
  if (accessToken && config.headers) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

// Handle 401 - attempt refresh token, retry once
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(true);
  });
  failedQueue = [];
};

Api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest?._isRetry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        }).then(() => Api(originalRequest));
      }

      originalRequest._isRetry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        if (newToken) {
          useUserStore.getState().setToken(newToken);
        }

        processQueue();

        return Api(originalRequest);
      } catch (err) {
        processQueue(err);
        useUserStore.getState().clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await Api.post(
      '/auth/refresh',
      {},
      {
        withCredentials: true,
      },
    );
    return response.data.accessToken;
  } catch {
    return null;
  }
};
