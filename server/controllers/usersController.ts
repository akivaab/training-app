import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
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

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.email ||
    !req?.body?.phone ||
    !req?.body?.password
  ) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      `
      INSERT INTO users (first_name, last_name, email, phone, password)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        hashedPassword,
      ]
    );
    res.status(201).json({ message: "User added successfully" });
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
      SELECT id, first_name AS firstName, last_name AS lastName, email, phone
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
    res.status(200).json(users[0]);
  } catch (err) {
    next(err);
  }
}

// export async function patchUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (!req?.params?.id) {
//     res.status(400).json({ message: "ID was not provided" });
//     return;
//   }
//   if (!req?.body?.category || !req?.body?.size || !req?.body?.description) {
//     res.status(400).json({ message: "Required fields not provided" });
//     return;
//   }
//   try {
//     const [result]: any = await pool.query(
//       `
//         UPDATE users
//         SET category = ?, size = ?, description = ?
//         WHERE id = ?
//         `,
//       [req.body.category, req.body.size, req.body.description, req.params.id]
//     );
//     if (result.affectedRows === 0) {
//       res
//         .status(404)
//         .json({ message: `No item found with ID: ${req.params.id}` });
//     } else {
//       res.status(200).json({ message: "Item updated successfully" });
//     }
//   } catch (err) {
//     next(err);
//   }
// }

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

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req?.body?.email || !req?.body?.password) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [results]: [any[], any] = await pool.query(
      `
      SELECT id, email, password
      FROM users
      WHERE email = ?
      `,
      [req.body.email]
    );
    if (results.length === 0) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const accessToken = jwt.sign(
        { user: { id: user.id } },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { user: { id: user.id } },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        { expiresIn: "1d" }
      );
      await pool.query(
        `
        UPDATE users
        SET refresh_token = ?
        WHERE id = ?
        `,
        [refreshToken, user.id]
      );

      res
        .status(200)
        .cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "User logged in successfully", accessToken });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
}
