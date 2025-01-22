import { NextFunction, Request, Response } from "express";
import { pool } from "../db/dbConn";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [users]: [any[], any] = await pool.query(
      `
      SELECT id, first_name AS firstName, last_name AS lastName, email, phone
      FROM users
      `
    );

    if (users.length === 0) {
      res.status(204).json({ message: "No users found" });
      return;
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [users]: [any[], any] = await pool.query(
      `
      SELECT id, first_name AS firstName, last_name AS lastName, email, phone, role
      FROM users
      WHERE id = ?
      `,
      [req.params.id]
    );
    if (users.length === 0) {
      res
        .status(404)
        .json({ message: `No user found with ID: ${req.params.id}.` });
      return;
    }

    const [lentItems]: [any[], any] = await pool.query(
      `
      SELECT id, category, size
      FROM items
      WHERE lender_id = ?
      `,
      [req.params.id]
    );
    const [borrowedItems]: [any[], any] = await pool.query(
      `
      SELECT id, category, size
      FROM items
      WHERE borrower_id = ?
      `,
      [req.params.id]
    );

    res.status(200).json({ ...users[0], lentItems, borrowedItems });
  } catch (err) {
    next(err);
  }
}

export async function patchUserRole(
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
        UPDATE users
        SET role = "admin"
        WHERE id = ?
        `,
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No user found with ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: "Item updated successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
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
      DELETE FROM users
      WHERE id = ?
      `,
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No user found with ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
}
