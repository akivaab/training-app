import { ItemType, CategoryType } from "../types/types";
import { AxiosInstance, isAxiosError } from "axios";

const url = "/items";

export async function getItems(axios: AxiosInstance): Promise<ItemType[]> {
  try {
    const res = await axios.get(`${url}`);
    if (res.status === 200) {
      return res.data;
    } /*if (res.status === 204)*/ else {
      return [];
    }
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function postItem(
  axios: AxiosInstance,
  category: CategoryType,
  size: number,
  description: string
) {
  try {
    const newItem: Partial<ItemType> = {
      category,
      size,
      description,
      lenderId: 7
    };
    await axios.post(`${url}`, newItem);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function getItem(
  axios: AxiosInstance,
  id: string
): Promise<ItemType> {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function patchItem(
  axios: AxiosInstance,
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
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function patchItemBorrower(axios: AxiosInstance, id: string) {
  try {
    await axios.patch(`${url}/${id}/borrow`);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function deleteItem(axios: AxiosInstance, id: string) {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
