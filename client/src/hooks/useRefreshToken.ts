import { Dispatch, SetStateAction, useCallback } from "react";
import axios from "../api/axios";
import { AuthStateType } from "../types/types";
import useAuth from "./useAuth";

function useRefreshToken() {
  const setAuth = useAuth()?.setAuth as Dispatch<SetStateAction<AuthStateType>>;

  const refresh = useCallback(async (): Promise<string> => {
    const response = await axios.get("/auth/refresh");
    const accessToken = response?.data?.accessToken;
    setAuth((prev) => {
      return { ...prev, accessToken };
    });
    return accessToken;
  }, [setAuth]);

  return refresh;
}

export default useRefreshToken;
