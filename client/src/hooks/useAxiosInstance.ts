import { useEffect } from "react";
import { AxiosInstance } from "axios";
import axiosInstance from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function useAxiosInstance(): AxiosInstance {
  const refresh = useRefreshToken();
  const auth = useAuth()?.auth;

  useEffect(() => {
    // add access token to request header
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // use refresh token if response status is 403 and resend request
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosInstance;
}

export default useAxiosInstance;
