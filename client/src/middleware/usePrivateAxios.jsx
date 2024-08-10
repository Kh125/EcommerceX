import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import useRefresh from "./useRefresh";

const axiosAuthAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

const useAxiosPrivate = () => {
  const refreshOnClick = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosAuthAPI.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && auth?.token) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosAuthAPI.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (
          (error.response?.status === 403 || error.response?.status === 302) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          try {
            const accessToken = await refreshOnClick();
            prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosAuthAPI(prevRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuthAPI.interceptors.request.eject(requestInterceptor);
      axiosAuthAPI.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refreshOnClick]);

  return axiosAuthAPI;
};

export default useAxiosPrivate;
