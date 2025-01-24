import { ItemType, UserType } from "../types/types";
import { AxiosInstance, isAxiosError } from "axios";

const url = "/users";

export async function getUsers(axios: AxiosInstance): Promise<UserType[]> {
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

export async function getUser(
  axios: AxiosInstance,
  id: string
): Promise<
  Partial<UserType> & {
    lentItems: Pick<ItemType, "id" | "category" | "size">[];
    borrowedItems: Pick<ItemType, "id" | "category" | "size">[];
  }
> {
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

export async function patchUser(
  axios: AxiosInstance,
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
) {
  try {
    await axios.patch(`${url}/${id}`, { firstName, lastName, email, phone });
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function patchUserRole(axios: AxiosInstance, id: string) {
  try {
    await axios.patch(`${url}/${id}/admin`);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function deleteUser(axios: AxiosInstance, id: string) {
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
