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

export async function postItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req?.body?.category || !req?.body?.size || !req?.body?.description) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    await pool.query(
      `
      INSERT INTO items (category, size, description, lender_id)
      VALUES (?, ?, ?, ?)
      `,
      [req.body.category, req.body.size, req.body.description, req.requesterId]
    );
    res.status(201).json({ message: "Item added successfully" });
  } catch (err) {
    next(err);
  }
}

export async function getItem(req: Request, res: Response, next: NextFunction) {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [items]: [any[], any] = await pool.query(
      `
      SELECT id, category, size, description, lender_id AS lenderId, borrower_id as borrowerId
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
    res.status(200).json(items[0]);
  } catch (err) {
    next(err);
  }
}

export async function patchItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  if (!req?.body?.category || !req?.body?.size || !req?.body?.description) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [result]: any = await pool.query(
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
) {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [result]: any = await pool.query(
      `
      UPDATE items
      SET borrower_id = ?
      WHERE id = ?
      `,
      [req.requesterId, req.params.id]
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
) {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [result]: any = await pool.query(
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
