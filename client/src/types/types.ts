import { Dispatch, ReactNode, SetStateAction } from "react";

// Component Types
export type CategoryType = "shirt" | "pants" | "shoes" | "suit" | "hat" | "tie";

export type ItemType = {
  id: number;
  category: CategoryType;
  size: number;
  description: string;
  lenderId: number;
  borrowerId?: number;
};

export type CommentType = {
  id: number;
  content: string;
  itemId: number;
  userId: number;
};

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: RoleType;
  refreshToken: string;
};

// Auth Types
export type RoleType = "user" | "admin";

export type AuthStateType = {
  userId?: number;
  userRole?: RoleType;
  accessToken?: string;
};

export type AuthContextValueType = {
  auth: AuthStateType;
  setAuth: Dispatch<SetStateAction<AuthStateType>>;
  isLoggingOut: boolean;
  logout: () => void;
};

export type TokenPayload = {
  user: Pick<UserType, "id" | "role">;
};

// Prop Types
export type AuthProviderPropsType = {
  children: ReactNode;
};

export type RequireAuthPropType = {
  allowedRoles: RoleType[];
};

export type AlertPropType = {
  message: string;
};

export type ItemErrorPropType = {
  onError: React.Dispatch<React.SetStateAction<string>>;
};
