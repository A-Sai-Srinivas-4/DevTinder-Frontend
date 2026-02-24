import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { logout, setLoading, setUser } from "@/appStore/slices/authSlice";
import { store } from "@/appStore/store";
import { endpoints } from "@/utils/endpoints";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
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
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(endpoints.profile)
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.get(endpoints.profile);
        store.dispatch(setUser(res.data?.data));
        return api(originalRequest);
      } catch (error) {
        store.dispatch(logout());
      }
    }

    store.dispatch(setLoading(false));
    return Promise.reject(error);
  },
);
