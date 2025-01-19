import { createContext, useState } from "react";
import {
  AuthContextValueType,
  AuthProviderPropsType,
  AuthStateType
} from "../types/types";

const AuthContext = createContext<AuthContextValueType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  const [auth, setAuth] = useState<AuthStateType>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
