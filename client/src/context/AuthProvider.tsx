import { createContext, useState } from "react";
import {
  AuthContextValueType,
  AuthProviderPropsType,
  AuthStateType
} from "../types/types";

const AuthContext = createContext<AuthContextValueType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const [auth, setAuth] = useState<AuthStateType>({});
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  function logout() {
    setIsLoggingOut(true);
    setAuth({});
    setTimeout(() => setIsLoggingOut(false), 100);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoggingOut, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
