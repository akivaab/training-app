import { createContext, useState } from "react";
import {
  AuthContextValueType,
  AuthProviderPropsType,
  AuthStateType
} from "../types/types";

// context with auth and logout info
const AuthContext = createContext<AuthContextValueType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderPropsType): JSX.Element {
  const [auth, setAuth] = useState<AuthStateType>({});
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  function logout(): void {
    setIsLoggingOut(true);
    setAuth({});
    setTimeout(() => setIsLoggingOut(false), 100);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLoggingOut, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
