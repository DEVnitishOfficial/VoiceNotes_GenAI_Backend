
import { Request, Response, NextFunction } from "express";
import { getPingResponse } from "./ping.service";

export const pingHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = getPingResponse();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
