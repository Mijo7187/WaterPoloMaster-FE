import { ReactNode, useCallback, useRef } from "react";

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { observer } from "mobx-react-lite";
import { IGetAuthUser } from "@modules/auth/auth.types";
import storage, { StorageEnum } from "@storage/storage";

// Backend always returns this shape
interface ApiResponseData<T = unknown> {
  status: number;
  messages: string[];
  data: T | null;
  detail: string;
}

// Typed axios response & error using the backend shape
type ApiResponse<T = unknown> = AxiosResponse<ApiResponseData<T>>;
type ApiError<T = unknown> = AxiosError<ApiResponseData<T>>;

// const baseURL = import.meta.env.VITE_API_URL as string;
const baseURL = "http://localhost:8000/api" as string;

export const axiosMain = axios.create({
  baseURL,
});

// Separate instance for refresh calls to avoid interceptor loops
const axiosRefresh = axios.create({
  baseURL,
});

// Refresh state – prevents multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null) => {
  failedQueue.forEach((pending) => {
    if (error || !token) {
      pending.reject(error ?? new Error("Token refresh failed"));
    } else {
      pending.resolve(token);
    }
  });
  failedQueue = [];
};

const redirectToLogin = () => {
  storage.removeData(StorageEnum.AUTH_USER);
  window.location.replace("/login");
};

export const errorHandling = (_messages: string[]) => {
  //   void AppMessage.error({ content: messages.join(", ") });
};

const getHeaders = (config: InternalAxiosRequestConfig) => {
  config.headers.Accept = "*/*";
  const authUser = storage.getData(
    StorageEnum.AUTH_USER,
  ) as IGetAuthUser | null;
  const token = authUser?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else config.headers.Authorization = null;
  config.headers["Content-Type"] ??= "application/json";
  return config;
};

export const WithAxios = observer(({ children }: { children: ReactNode }) => {
  const resInterceptorId = useRef<number | null>(null);
  const reqInterceptorId = useRef<number | null>(null);
  const requestCounter = useRef<number>(0);

  const startLoader = () => {
    requestCounter.current += 1;
    if (requestCounter.current === 1) {
      // modalStore.startLoader();
    }
  };

  const stopLoader = () => {
    requestCounter.current -= 1;
    if (requestCounter.current === 0) {
      // modalStore.endLoader();
    }
  };

  const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    startLoader();
    return getHeaders(config);
  };

  const getResponseData = (response: ApiResponse) => {
    stopLoader();
    if (response.status === 204) {
      return response;
    }
    return response.data.data;
  };

  const handleResponseErrors = async (error: ApiError) => {
    stopLoader();

    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest) {
      // If we're already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosMain(originalRequest));
            },
            reject: (err: Error) => {
              reject(err);
            },
          });
        });
      }

      isRefreshing = true;

      const authUser = storage.getData(
        StorageEnum.AUTH_USER,
      ) as IGetAuthUser | null;
      const refreshTokenValue = authUser?.refresh_token;

      if (!refreshTokenValue) {
        isRefreshing = false;
        processQueue(new Error("No refresh token"), null);
        redirectToLogin();
        return Promise.reject(new Error("No refresh token available"));
      }

      try {
        const response = await axiosRefresh.post<ApiResponseData<IGetAuthUser>>(
          "/auth/refresh",
          { refresh_token: refreshTokenValue },
        );

        const newAuthData = response.data.data;

        if (!newAuthData) {
          throw new Error("Refresh response contained no data");
        }

        // Update tokens in storage
        storage.setData(StorageEnum.AUTH_USER, {
          ...authUser,
          access_token: newAuthData.access_token,
          refresh_token: newAuthData.refresh_token,
        });

        const newAccessToken = newAuthData.access_token;

        isRefreshing = false;
        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosMain(originalRequest);
      } catch {
        isRefreshing = false;
        processQueue(new Error("Refresh failed"), null);
        redirectToLogin();
        return Promise.reject(new Error("Token refresh failed"));
      }
    }

    const messages = error.response?.data.messages;
    if (messages?.length) {
      errorHandling(messages);
    }
    return Promise.reject(new Error(error.message));
  };

  const setInterceptor = useCallback((axiosInstance: AxiosInstance) => {
    if (
      axiosInstance.interceptors.request.handlers &&
      axiosInstance.interceptors.request.handlers.length > 0
    )
      return;
    resInterceptorId.current = axiosInstance.interceptors.response.use(
      getResponseData as unknown as (
        value: AxiosResponse,
      ) => AxiosResponse | Promise<AxiosResponse>,
      handleResponseErrors,
    );
    reqInterceptorId.current = axiosInstance.interceptors.request.use(
      authRequestInterceptor,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setInterceptor(axiosMain);

  return children;
});
