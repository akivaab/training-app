import { ItemType, UserType } from "../types/types";
import { AxiosInstance } from "axios";
import throwError from "../util/throwError";

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
    throwError(err);
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
) {
  try {
    await axios.patch(`${url}/${id}`, { firstName, lastName, email, phone });
  } catch (err) {
    throwError(err);
  }
}

export async function patchUserRole(axios: AxiosInstance, id: string) {
  try {
    await axios.patch(`${url}/${id}/admin`);
  } catch (err) {
    throwError(err);
  }
}

export async function deleteUser(axios: AxiosInstance, id: string) {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    throwError(err);
  }
}
