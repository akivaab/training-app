import { ResultSetHeader } from "mysql2";
import { NextFunction, Request, Response } from "express";
import { pool } from "../db/dbConn";
import { DBResultType, ItemType, UserType } from "../types/types";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const [users] = await pool.query<
      DBResultType<
        Pick<UserType, "id" | "firstName" | "lastName" | "email" | "phone">
      >[]
    >(
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

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }

  // reject if not user's own profile nor admin
  if (
    req.requesterId?.toString() !== req.params.id &&
    req.requesterRole !== "admin"
  ) {
    res.status(401).json({ message: "Cannot view another user's profile" });
    return;
  }

  try {
    const [users] = await pool.execute<
      DBResultType<
        Pick<
          UserType,
          "id" | "firstName" | "lastName" | "email" | "phone" | "role"
        >
      >[]
    >(
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

    const [lentItems] = await pool.execute<
      DBResultType<Pick<ItemType, "id" | "category" | "size">>[]
    >(
      `
      SELECT id, category, size
      FROM items
      WHERE lender_id = ?
      `,
      [req.params.id]
    );
    const [borrowedItems] = await pool.execute<
      DBResultType<Pick<ItemType, "id" | "category" | "size">>[]
    >(
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

export async function patchUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  if (
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.email ||
    !req?.body?.phone
  ) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }

  // reject if not user's own profile nor admin
  if (
    req.requesterId?.toString() !== req.params.id &&
    req.requesterRole !== "admin"
  ) {
    res.status(401).json({ message: "Cannot view another user's profile" });
    return;
  }

  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `
      UPDATE users
      SET first_name = ?, last_name = ?, email = ?, phone = ?
      WHERE id = ?
      `,
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        req.params.id,
      ]
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No user found with ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function patchUserRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
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
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.params?.id) {
    res.status(400).json({ message: "ID was not provided" });
    return;
  }
  try {
    const [result] = await pool.execute<ResultSetHeader>(
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
