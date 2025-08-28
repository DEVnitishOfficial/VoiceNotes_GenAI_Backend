

import express from "express";
import { validatePing } from "./ping.validator";
import { pingHandler } from "./ping.controller";

const pingRouter = express.Router();

pingRouter.post("/", validatePing, pingHandler);

export default pingRouter;

