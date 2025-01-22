import { NextFunction, Request, Response } from "express";
import { pool } from "../db/dbConn";

export async function getAllItemComments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req?.params?.itemId) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [comments]: [any[], any] = await pool.query(
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
) {
  if (
    !req?.params?.itemId ||
    isNaN(parseInt(req.params.itemId)) ||
    !req?.body?.content
  ) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    await pool.query(
      `
      INSERT INTO comments (content, item_id, user_id)
      VALUES (?, ?, ?)
      `,
      [req.body.content, parseInt(req.params.itemId), req.requesterId]
    );
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    next(err);
  }
}

export async function deleteItemComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req?.params?.itemId || !req?.params?.commentId) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [result]: any = await pool.query(
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
