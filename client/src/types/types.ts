import { Dispatch, ReactNode, SetStateAction } from "react";

export type CategoryType = "shirt" | "pants" | "shoes" | "suit" | "hat" | "tie";

export type RequireAuthPropType = {
  allowedRoles: string[];
};

export type AlertPropType = {
  message: string;
};

export type ItemSearchMenuPropType = {
  onSubmit: (newCategory: CategoryType, newMin: number, newMax: number) => void;
};

export type ItemListPropType = {
  items: ItemType[];
};

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
  role: string;
  refreshToken: string;
};

export type AuthStateType = {
  userId?: number;
  userRole?: string;
  accessToken?: string;
};

export type AuthContextValueType = {
  auth: AuthStateType;
  setAuth: Dispatch<SetStateAction<AuthStateType>>;
};

export type AuthProviderPropsType = {
  children: ReactNode;
};

export type TokenPayload = {
  user: Pick<UserType, "id" | "role">;
};
