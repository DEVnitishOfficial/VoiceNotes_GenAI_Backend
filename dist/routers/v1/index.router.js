"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ping_router_1 = __importDefault(require("../../modules/ping/ping.router"));
const note_route_1 = __importDefault(require("../../modules/notes/note.route"));
const v1Router = express_1.default.Router();
v1Router.use("/ping", ping_router_1.default);
v1Router.use("/notes", note_route_1.default);
exports.default = v1Router;
