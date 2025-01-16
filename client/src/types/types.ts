export type CategoryType = "shirt" | "pants" | "shoes" | "suit" | "hat" | "tie";
export type SizeRangeType = { min: number; max: number };

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
