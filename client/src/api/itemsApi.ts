import { ItemType, CategoryType, UserType } from "../types/types";
import { AxiosInstance } from "axios";
import throwError from "../util/throwError";

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
    throwError(err);
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
      description
    };
    await axios.post(`${url}`, newItem);
  } catch (err) {
    throwError(err);
  }
}

export async function getItem(
  axios: AxiosInstance,
  id: string
): Promise<ItemType & UserType> {
  try {
    const res = await axios.get(`${url}/${id}`);
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
) {
  try {
    const updatedItem: Partial<ItemType> = {
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
) {
  try {
    await axios.patch(`${url}/${id}/borrow`, { isBorrowed });
  } catch (err) {
    throwError(err);
  }
}

export async function deleteItem(axios: AxiosInstance, id: string) {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    throwError(err);
  }
}
