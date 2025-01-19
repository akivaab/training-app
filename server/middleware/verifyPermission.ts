import { NextFunction, Request, Response } from "express";

export default function verifyPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req?.requesterRole || !req?.requesterId) {
    res.status(401).json({ message: "Could not authorize" });
    return;
  }
  // adjust to allow user to view oneself and delete own items?
  if (req.requesterRole !== "admin") {
    res.status(401).json({ message: "Could not authorize" });
    return;
  }
  next();
}
