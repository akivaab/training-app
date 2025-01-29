import { AxiosInstance } from "axios";
import throwError from "../util/throwError";
import { ItemType, CategoryType, UserType } from "../types/types";

const url = "/items";

export async function getItems(
  axios: AxiosInstance
): Promise<Pick<ItemType, "id" | "category" | "size" | "description">[]> {
  try {
    const res = await axios.get(`${url}`);
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    throwError(err);
  }
}

export async function getItem(
  axios: AxiosInstance,
  id: string
): Promise<
  ItemType & Pick<UserType, "firstName" | "lastName" | "email" | "phone">
> {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (err) {
    throwError(err);
  }
}

export async function postItem(
  axios: AxiosInstance,
  category: CategoryType,
  size: number,
  description: string
): Promise<number> {
  try {
    const newItem: Pick<ItemType, "category" | "size" | "description"> = {
      category,
      size,
      description
    };
    const res = await axios.post(`${url}`, newItem);
    return res.data;
  } catch (err) {
    throwError(err);
  }
}

export async function patchItem(
  axios: AxiosInstance,
  id: string,
  category: CategoryType,
  size: number,
  description: string
): Promise<void> {
  try {
    const updatedItem: Pick<ItemType, "category" | "size" | "description"> = {
      category,
      size,
      description
    };
    await axios.patch(`${url}/${id}`, updatedItem);
  } catch (err) {
    throwError(err);
  }
}

export async function patchItemBorrower(
  axios: AxiosInstance,
  id: string,
  isBorrowed: boolean
): Promise<void> {
  try {
    await axios.patch(`${url}/${id}/borrow`, { isBorrowed });
  } catch (err) {
    throwError(err);
  }
}

export async function deleteItem(
  axios: AxiosInstance,
  id: string
): Promise<void> {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    throwError(err);
  }
}
