import "express";

declare global {
  namespace Express {
    export interface Request {
      requesterId?: number;
      requesterRole?: string;
    }
  }
}
