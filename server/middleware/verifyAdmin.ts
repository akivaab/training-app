import { NextFunction, Request, Response } from "express";

export default function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req?.requesterRole ||
    !req?.requesterId ||
    req.requesterRole !== "admin"
  ) {
    res.status(401).json({ message: "Could not authorize" });
    return;
  }
  next();
}
