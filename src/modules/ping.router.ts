

import express from "express";
import { pingHandler } from "./ping.controller";
import { validatePing } from "./ping.validator";

const pingRouter = express.Router();

pingRouter.post("/", validatePing, pingHandler); 

export default pingRouter;

