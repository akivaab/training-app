import axios from "axios";
import { ItemType, CategoryType } from "../types/types";

const url = "http://localhost:5000/items";

export async function getItems(): Promise<ItemType[]> {
  try {
    const res = await axios.get(`${url}`);
    if (res.status === 200) {
      return res.data;
    } /*if (res.status === 204)*/ else {
      return [];
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function postItem(
  category: CategoryType,
  size: number,
  description: string
) {
  try {
    const newItem: Partial<ItemType> = {
      category,
      size,
      description,
      lenderId: 1
    };
    await axios.post(`${url}`, newItem);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function getItem(id: string): Promise<ItemType> {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function patchItem(
  id: string,
  category: CategoryType,
  size: number,
  description: string
) {
  try {
    const updatedItem: Partial<ItemType> = {
      category,
      size,
      description
    };
    await axios.patch(`${url}/${id}`, updatedItem);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function deleteItem(id: string) {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
