
import { Request, Response, NextFunction } from "express";

export const validatePing = (req: Request, res: Response, next: NextFunction) => {
  // validation not needed here
  next();
};
