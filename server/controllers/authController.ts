import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { pool } from "../db/dbConn";
import { DBResultType, TokenPayload, UserType } from "../types/types";
import { ResultSetHeader } from "mysql2";

export async function authLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req?.body?.email || !req?.body?.password) {
    res.status(400).json({ message: "Required fields not provided" });
    return;
  }
  try {
    const [users] = await pool.query<
      DBResultType<Pick<UserType, "id" | "email" | "password" | "role">>[]
    >(
      `
        SELECT id, email, password, role
        FROM users
        WHERE email = ?
        `,
      [req.body.email]
    );
    if (users.length === 0) {
      res.status(404).json({ message: "Invalid email or password" });
      return;
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const payload: TokenPayload = { user: { id: user.id, role: user.role } };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        payload,
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
          secure: true,
          sameSite: "strict",
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

export async function authRegister(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
    const [result] = await pool.query<ResultSetHeader>(
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
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Failed to register user" });
    } else {
      res.status(201).json({ message: "User added successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function authRefresh(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401).json({ message: "Required token not provided" });
    return;
  }
  const refreshToken = cookies.jwt;
  try {
    const [users] = await pool.query<DBResultType<Pick<UserType, "id">>[]>(
      `
          SELECT id
          FROM users
          WHERE refresh_token = ?
          `,
      [refreshToken]
    );
    if (users.length === 0) {
      res.status(403).json({ message: "Could not authenticate" });
      return;
    }

    const user = users[0];

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      (err: any, decoded: any) => {
        if (err || decoded.user.id !== user.id) {
          res.status(403).json({ message: "Could not authenticate" });
          return;
        }
        const payload: TokenPayload = {
          user: { id: decoded.user.id, role: decoded.user.role },
        };
        const accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: "30s" }
        );
        res
          .status(200)
          .json({ message: "User login refreshed successfully", accessToken });
      }
    );
  } catch (err) {
    next(err);
  }
}

export async function authLogout(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  //note: delete access token in frontend
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(204).json({ message: "Already logged out" });
    return;
  }
  const refreshToken = cookies.jwt;
  try {
    const [users] = await pool.query<DBResultType<Pick<UserType, "id">>[]>(
      `
      SELECT id
      FROM users
      WHERE refresh_token = ?
      `,
      [refreshToken]
    );
    if (users.length === 0) {
      res.clearCookie("jwt", { httpOnly: true });
      res.status(204).json({ message: "Logged out successfully" });
      return;
    }

    const user = users[0];

    await pool.query(
      `
      UPDATE users
      SET refresh_token = NULL
      WHERE id = ?
      `,
      [user.id]
    );
    res.clearCookie("jwt", { httpOnly: true });
    res.status(204).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}
