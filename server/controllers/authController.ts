import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { pool } from "../db/dbConn";

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

export async function registerUser(
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
