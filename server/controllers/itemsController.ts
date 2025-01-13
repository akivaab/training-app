import { NextFunction, Request, Response } from "express";
import { pool } from "../db/dbConn";

export async function getAllItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [items]: [any[], any] = await pool.query(
      `
      SELECT *
      FROM items
      `
    );

    if (items.length === 0) {
      res.status(204).json({ message: "No posts available" });
      return;
    }
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export async function postItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req?.body?.category ||
    !req?.body?.size ||
    !req?.body?.description ||
    !req?.body?.lenderId
  ) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    await pool.query(
      `
      INSERT INTO items (category, size, description, lender_id)
      VALUES (?, ?, ?, ?)
      `,
      [
        req.body.category,
        req.body.size,
        req.body.description,
        req.body.lenderId,
      ]
    );
    res.status(201).json({ message: "Item added successfully" });
  } catch (err) {
    next(err);
  }
}
