import { RowDataPacket } from "mysql2";

type CategoryType = "shirt" | "pants" | "shoes" | "suit" | "hat" | "tie";
type RoleType = "user" | "admin";

export type DBResultType<T> = T & RowDataPacket;

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

export type TokenPayload = {
  user: Pick<UserType, "id" | "role">;
};
