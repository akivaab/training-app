import { QueryError } from "mysql2";
import { Request, Response, NextFunction } from "express";

function isQueryError(err: Error): err is QueryError {
  return err && typeof err === "object" && "errno" in err;
}

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Duplicate entry
  if (isQueryError(err) && err.errno === 1062) {
    res
      .status(409)
      .json({ message: "User with this email or phone is already registered" });
  } else {
    res.status(500).json({ message: "Unknown internal server error" });
  }
}
