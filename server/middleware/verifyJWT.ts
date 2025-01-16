import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({ message: "Could not authenticate" });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);
    next();
  } catch (err) {
    res.status(403).json({ message: "Could not authenticate" });
  }
}
