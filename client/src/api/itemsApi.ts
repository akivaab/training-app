//import axios from "axios";

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

export async function getItems(): Promise<ItemType[]> {
  const item1: ItemType = {
    id: 1,
    category: "shirt",
    size: 20,
    description: "shirt1",
    lenderId: 2
  };
  const item2: ItemType = {
    id: 2,
    category: "pants",
    size: 30,
    description: "pants1",
    lenderId: 2
  };
  const res = {
    data: [item1, item2]
  }; //await axios.get("url");
  return res.data;
}
