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

let globalId = 3;

let db: ItemType[] = [
  {
    id: 1,
    category: "shirt",
    size: 20,
    description: "shirt1",
    lenderId: 2
  },
  {
    id: 2,
    category: "pants",
    size: 30,
    description: "pants1",
    lenderId: 2
  }
];

export async function getItems(): Promise<ItemType[]> {
  const res = {
    data: db
  }; //await axios.get("url");
  return res.data;
}

export async function getItem(id: string): Promise<ItemType | null> {
  const item = db.find((i) => i.id.toString() === id);
  return item ? item : null;
}

export async function postItem(
  category: CategoryType,
  size: number,
  description: string
) {
  db.push({
    id: globalId,
    category,
    size,
    description,
    lenderId: 4
  });
  console.log(globalId);
  globalId++;
}

export async function putItem(
  id: string,
  category: CategoryType,
  size: number,
  description: string
) {
  const item = db.find((i) => i.id.toString() === id);
  if (item) {
    item.category = category;
    item.size = size;
    item.description = description;
  }
}

export async function deleteItem(id: string) {
  db = db.filter((i) => i.id.toString() !== id);
}
