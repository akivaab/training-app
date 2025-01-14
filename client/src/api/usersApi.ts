import axios from "axios";
import { UserType } from "../types/types";

const url = "http://localhost:5000/users";

export async function getUsers(): Promise<UserType[]> {
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

export async function postUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string
) {
  try {
    const newUser: Partial<UserType> = {
      firstName,
      lastName,
      email,
      phone,
      password
    };
    await axios.post(`${url}`, newUser);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function getUser(id: string): Promise<UserType> {
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

export async function deleteUser(id: string) {
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
