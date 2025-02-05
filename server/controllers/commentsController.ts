import { ResultSetHeader } from "mysql2";
import { NextFunction, Request, Response } from "express";
import { pool } from "../db/dbConn";
import { CommentType, DBResultType, UserType } from "../types/types";

export async function getAllItemComments(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.itemId) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [comments] = await pool.execute<
      DBResultType<CommentType & Pick<UserType, "firstName" | "lastName">>[]
    >(
      `
      SELECT c.id, content, item_id AS itemId, user_id AS userId, first_name AS firstName, last_name AS lastName
      FROM comments AS c
      INNER JOIN users AS u
      ON c.user_id = u.id
      WHERE item_id = ?
      `,
      [req.params.itemId]
    );

    if (comments.length === 0) {
      res.status(204).json({ message: "No comments found" });
      return;
    }
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
}

export async function postItemComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.itemId || !req?.body?.content) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      INSERT INTO comments (content, item_id, user_id)
      VALUES (?, ?, ?)
      `,
      [req.body.content, req.params.itemId, req.requesterId]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Failed to add comment" });
    } else {
      res.status(201).json({ message: "Comment added successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteItemComment(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.itemId || !req?.params?.commentId) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [comments] = await pool.execute<
      DBResultType<Pick<CommentType, "userId">>[]
    >(
      `
      SELECT user_id AS userId
      FROM comments
      WHERE id = ?
      `,
      [req.params.commentId]
    );
    if (comments.length === 0) {
      res.status(404).json({
        message: `No comment found with ID: ${req.params.commentId}.`,
      });
      return;
    }

    // deleting comments is reserved for admins and the poster
    if (
      req.requesterId !== comments[0].userId &&
      req.requesterRole !== "admin"
    ) {
      res.status(401).json({ message: "Cannot delete another user's comment" });
      return;
    }
    const [result] = await pool.execute<ResultSetHeader>(
      `
      DELETE FROM comments
      WHERE id = ?
      `,
      [req.params.commentId]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No comment found with ID: ${req.params.commentId}` });
    } else {
      res.status(200).json({ message: "Comment deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
}
