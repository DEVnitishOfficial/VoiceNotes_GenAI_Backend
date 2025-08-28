
import express from "express";
import pingRouter from "../../modules/ping.router";

const v1Router = express.Router();

v1Router.use("/ping", pingRouter);

export default v1Router;
