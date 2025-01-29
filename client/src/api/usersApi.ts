import { AxiosInstance } from "axios";
import throwError from "../util/throwError";
import { ItemType, UserType } from "../types/types";

const url = "/users";

export async function getUsers(
  axios: AxiosInstance
): Promise<
  Pick<UserType, "id" | "firstName" | "lastName" | "email" | "phone">[]
> {
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

export async function getUser(
  axios: AxiosInstance,
  id: string
): Promise<
  Pick<
    UserType,
    "id" | "firstName" | "lastName" | "email" | "phone" | "role"
  > & {
    lentItems: Pick<ItemType, "id" | "category" | "size">[];
    borrowedItems: Pick<ItemType, "id" | "category" | "size">[];
  }
> {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  } catch (err) {
    throwError(err);
  }
}

export async function patchUser(
  axios: AxiosInstance,
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string
): Promise<void> {
  try {
    const updatedUser: Pick<
      UserType,
      "firstName" | "lastName" | "email" | "phone"
    > = { firstName, lastName, email, phone };
    await axios.patch(`${url}/${id}`, updatedUser);
  } catch (err) {
    throwError(err);
  }
}

export async function patchUserRole(
  axios: AxiosInstance,
  id: string
): Promise<void> {
  try {
    await axios.patch(`${url}/${id}/admin`);
  } catch (err) {
    throwError(err);
  }
}

export async function deleteUser(
  axios: AxiosInstance,
  id: string
): Promise<void> {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    throwError(err);
  }
}
