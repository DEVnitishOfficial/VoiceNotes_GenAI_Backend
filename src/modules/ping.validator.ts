
import { Request, Response, NextFunction } from "express";

export const validatePing = (req: Request, res: Response, next: NextFunction) => {
  // (Optional) Add validation logic if needed
  next();
};
