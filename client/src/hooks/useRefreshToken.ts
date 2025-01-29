import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthStateType } from "../types/types";

function useRefreshToken(): () => Promise<string> {
  const setAuth = useAuth()?.setAuth as Dispatch<SetStateAction<AuthStateType>>;

  // use refresh token to renew access token
  const refresh = useCallback(async (): Promise<string> => {
    const response = await axios.get("/auth/refresh");
    const accessToken: string = response?.data?.accessToken;
    setAuth((prev) => {
      return { ...prev, accessToken };
    });
    return accessToken;
  }, [setAuth]);

  return refresh;
}

export default useRefreshToken;
