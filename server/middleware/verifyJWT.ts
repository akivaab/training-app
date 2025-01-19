import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { TokenPayload } from "../types/types";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Could not authenticate" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as TokenPayload;
    req.requesterId = decoded.user.id;
    req.requesterRole = decoded.user.role;
    next();
  } catch (err) {
    res.status(403).json({ message: "Could not authenticate" });
  }
}
