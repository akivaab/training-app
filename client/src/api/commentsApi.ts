import axios from "axios";
import { CommentType } from "../types/types";

const url = (itemId: string) =>
  `http://localhost:5000/items/${itemId}/comments`;

export async function getComments(itemId: string): Promise<CommentType[]> {
  try {
    const res = await axios.get(`${url(itemId)}`);
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

export async function postComment(itemId: string, content: string) {
  try {
    const newContent: Partial<CommentType> = {
      content,
      userId: 1
    };
    await axios.post(`${url(itemId)}`, newContent);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function deleteComment(itemId: string, commentId: number) {
  try {
    await axios.delete(`${url(itemId)}/${commentId}`);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}
