import { CommentType } from "../types/types";
import { AxiosInstance, isAxiosError } from "axios";

const url = (itemId: string) => `/items/${itemId}/comments`;

export async function getComments(
  axios: AxiosInstance,
  itemId: string
): Promise<CommentType[]> {
  try {
    const res = await axios.get(`${url(itemId)}`);
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

export async function postComment(
  axios: AxiosInstance,
  itemId: string,
  content: string
) {
  try {
    const newContent: Partial<CommentType> = {
      content
    };
    await axios.post(`${url(itemId)}`, newContent);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function deleteComment(
  axios: AxiosInstance,
  itemId: string,
  commentId: number
) {
  try {
    await axios.delete(`${url(itemId)}/${commentId}`);
  } catch (err) {
    if (isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
