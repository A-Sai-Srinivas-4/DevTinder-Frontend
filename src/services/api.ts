import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { logout, setLoading, setUser } from "@/appStore/slices/authSlice";
import { store } from "@/appStore/store";
import { endpoints } from "@/utils/endpoints";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3003/api",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    store.dispatch(setLoading(true));
    return config;
  },
  (error: AxiosError) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  async (error: AxiosError) => {
    store.dispatch(setLoading(false));

    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 🚨 DO NOT RETRY AUTH CHECK API
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(endpoints.login)
    ) {
      originalRequest._retry = true;

      try {
        // silently verify cookie session
        const res = await api.get(endpoints.login);

        store.dispatch(setUser(res.data?.data));

        // retry original API once
        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
