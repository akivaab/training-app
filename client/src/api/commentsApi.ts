import { CommentType, UserType } from "../types/types";
import { AxiosInstance } from "axios";
import throwError from "../util/throwError";

const url = (itemId: string) => `/items/${itemId}/comments`;

export async function getComments(
  axios: AxiosInstance,
  itemId: string
): Promise<(CommentType & Pick<UserType, "firstName" | "lastName">)[]> {
  try {
    const res = await axios.get(`${url(itemId)}`);
    if (res.status === 200) {
      return res.data;
    } /*if (res.status === 204)*/ else {
      return [];
    }
  } catch (err) {
    throwError(err);
  }
}

export async function postComment(
  axios: AxiosInstance,
  itemId: string,
  content: string
): Promise<void> {
  try {
    const newContent: Partial<CommentType> = {
      content
    };
    await axios.post(`${url(itemId)}`, newContent);
  } catch (err) {
    throwError(err);
  }
}

export async function deleteComment(
  axios: AxiosInstance,
  itemId: string,
  commentId: number
): Promise<void> {
  try {
    await axios.delete(`${url(itemId)}/${commentId}`);
  } catch (err) {
    throwError(err);
  }
}
