import { Request, Response, NextFunction } from "express";
import { createNoteSchema, updateNoteSchema } from "./note.schema";

export const validateCreateNote = (req: Request, res: Response, next: NextFunction) => {
  try {
    createNoteSchema.parse(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: "Validation error", errors: err.errors });
  }
};

export const validateUpdateNote = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateNoteSchema.parse(req.body);
    next();
  } catch (err: any) {
    return res.status(400).json({ message: "Validation error", errors: err.errors });
  }
};
