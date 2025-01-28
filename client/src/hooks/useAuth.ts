import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { AuthContextValueType } from "../types/types";

function useAuth(): AuthContextValueType | undefined {
  return useContext(AuthContext);
}

export default useAuth;
