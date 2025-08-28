import express from "express";
import pingRouter from "../../modules/ping/ping.router";
import noteRouter from "../../modules/notes/note.route";

const v1Router = express.Router();

v1Router.use("/ping", pingRouter);
v1Router.use("/notes", noteRouter);

export default v1Router;
