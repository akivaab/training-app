import { UserType } from "../types/types";
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
): Promise<UserType> {
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

// export async function patchItem(
//   id: string,
//   category: CategoryType,
//   size: number,
//   description: string
// ) {
//   try {
//     const updatedItem: Partial<ItemType> = {
//       category,
//       size,
//       description
//     };
//     await axios.patch(`${url}/${id}`, updatedItem);
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       const errorMessage = err.response?.data?.message || "An error occurred";
//       throw new Error(errorMessage);
//     } else {
//       throw new Error("An unexpected error occurred. Please try again later.");
//     }
//   }
// }

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
