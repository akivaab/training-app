import { ResultSetHeader } from "mysql2";
import { NextFunction, Request, Response } from "express";
import { pool } from "../db/dbConn";
import { DBResultType, ItemType, UserType } from "../types/types";

export async function getAllItems(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const [items] = await pool.query<
      DBResultType<Pick<ItemType, "id" | "category" | "size" | "description">>[]
    >(
      `
      SELECT id, category, size, description
      FROM items
      `
    );

    if (items.length === 0) {
      res.status(204).json({ message: "No items found" });
      return;
    }
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export async function getItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [items] = await pool.query<
      DBResultType<
        ItemType & Pick<UserType, "firstName" | "lastName" | "email" | "phone">
      >[]
    >(
      `
      SELECT i.id, category, size, description, lender_id AS lenderId, borrower_id as borrowerId, first_name AS firstName, last_name as lastName, email, phone
      FROM items AS i
      INNER JOIN users AS u
      ON i.lender_id = u.id
      WHERE i.id = ?
      `,
      [req.params.id]
    );
    if (items.length === 0) {
      res
        .status(404)
        .json({ message: `No item found with ID: ${req.params.id}.` });
      return;
    }
    res.status(200).json(items[0]);
  } catch (err) {
    next(err);
  }
}

export async function postItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.body?.category || !req?.body?.size || !req?.body?.description) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      INSERT INTO items (category, size, description, lender_id)
      VALUES (?, ?, ?, ?)
      `,
      [req.body.category, req.body.size, req.body.description, req.requesterId]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: `Failed to add item` });
    } else {
      res.status(201).json(result.insertId);
    }
  } catch (err) {
    next(err);
  }
}

export async function patchItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  if (!req?.body?.category || !req?.body?.size || !req?.body?.description) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      UPDATE items
      SET category = ?, size = ?, description = ?
      WHERE id = ?
      `,
      [req.body.category, req.body.size, req.body.description, req.params.id]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No item found with ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: "Item updated successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function patchItemBorrower(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  if (!req.body.hasOwnProperty("isBorrowed")) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [result] = await pool.query<ResultSetHeader>(
      `
      UPDATE items
      SET borrower_id = ?
      WHERE id = ?
      `,
      [req.body.isBorrowed ? req.requesterId : null, req.params.id]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No item found with ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: "Item updated successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [items] = await pool.query<
      DBResultType<Pick<ItemType, "lenderId">>[]
    >(
      `
      SELECT lender_id AS lenderId
      FROM items
      WHERE id = ?
      `,
      [req.params.id]
    );
    if (items.length === 0) {
      res
        .status(404)
        .json({ message: `No item found with ID: ${req.params.id}.` });
      return;
    }
    if (
      req.requesterId !== items[0].lenderId &&
      req.requesterRole !== "admin"
    ) {
      res.status(401).json({ message: "Cannot delete another user's item" });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      `
      DELETE FROM items
      WHERE id = ?
      `,
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No item found with ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
}
